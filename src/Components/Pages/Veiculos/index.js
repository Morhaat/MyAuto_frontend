import React, {useState, useEffect} from 'react';
import Login from '../login';
import { isEmpty } from 'lodash';
import Utoken from  '../../../Services/auth';
import {useCookies} from 'react-cookie';
import CurrencyInput from 'react-currency-masked-input';
import axios from 'axios';
import Div from './Styled';
import api from '../../../Services/api';
import Img from './componentImg';
import { Link } from 'react-router-dom';
import useWindowDimension from 'use-window-dimensions';


const PVeiculos = ()=>{ 
// Valida login..........................................................................
    const [token, setToken, removeToken] = useCookies(['token']);
    useEffect(()=>{
        const dados = sessionStorage.getItem('token');
        Utoken(dados, setToken, removeToken);

    }, []);
    

//Load api anuncios......................................................................

const [existeData, setexisteData] = useState(false);
const [listVeiculos, setListVeiculos] = useState([]);
const [filtroAnc, setFiltroAnc] = useState({});

//Estados dos Edits de valores do filtro.............................................................................
const [valorInicial, setValorInicial] = useState(0);
const [valorFinal, setValorFinal] = useState(0);
const [evalorInicial, setEvalorInicial] = useState(null);
const [evalorFinal, setEvalorFinal] = useState();
const [cor, setCor] = useState('');
//Fim dos estados dos Edits de valores do filtro.............................................................................

//Selects api veículos.........................................................................

const [selecaoMarca, setMarca] = useState([]);
const [selecaoModelo, setModelo] = useState([]);
const [selecaoAno, setAnoModelo] = useState([]);
const [dadosFipe, setDadosFipe] = useState('');

const [optMarca, setOptMarca] = useState({
    value:"",
    caption: "",
    apiFIPE: ""
});
const [optModelo, setOptModelo] = useState({
    value:"",
    caption: "",
    apiFIPE: ""
});
const [optAno, setOptAno] = useState({
    value:"",
    caption: "",
    apiFIPE: ""
});
//.............................................................................................

    const dadosFiltro = (evento)=>{
        evento.preventDefault();
        setFiltroAnc({
            optMarca,
            optModelo,
            optAno,
            cor,
            valorInicial,
            valorFinal
        });
    }

    function numberParaReal(numero){
        var formatado = "R$ " + numero.toFixed(2).replace(".",",");
        return formatado;
    }

    useEffect(()=>{
        async function loadAnuncios(){
            await api.get('/anuncios', {filtroAnc})
            .then((response) => {
                console.log(response.data.resultFiltro);
                if (response.data.resultFiltro.length === 0){
                    setexisteData(false);
                    setListVeiculos([{error:'Não existem registros com estes dados!'}]);    
                }
                else{
                    setexisteData(true);
                    setListVeiculos(response.data.resultFiltro);  
                }
            })
            .catch((error)=> {
                if (error.response){
                    setexisteData(false);
                    setListVeiculos([{error:' *Sem resposta* - '+error.response.data}]); 
                }
                else if (error.request){
                    setexisteData(false);
                    setListVeiculos([{error:'Houve uma falha durante a requisição! - '+error.request+' - '+error.message}]); 
                }
            }) 
        }

        loadAnuncios();
        console.log(filtroAnc);
    } ,[filtroAnc])
//........................................................................................................


useEffect(() => {
    async function loadMarcas(){
        const response = await axios.get('https://parallelum.com.br/fipe/api/v1/carros/marcas');
        setMarca(response.data);
    }
    loadMarcas();
}, [optMarca]);

useEffect(() => {
    async function loadModelos(){
        const response = await axios.get(optMarca.apiFIPE);
        setModelo(response.data.modelos);
    }
    if(!optMarca.apiFIPE == ""){
        loadModelos();
    }
}, [optMarca]);

useEffect(() => {
    if(!optModelo.apiFIPE==""){
        async function loadAnoModelo(){
            const response = await axios.get(optModelo.apiFIPE);
            setAnoModelo(response.data);
        }
        loadAnoModelo();
    }
}, [optModelo]);

useEffect(() => {
    if(!optAno.apiFIPE==""){
        async function loadAnoModelo(){
            const response = await axios.get(optAno.apiFIPE);
            setDadosFipe(response.data);
        }
        loadAnoModelo();
    }
}, [optAno]);
//........................................................................................................
async function handleChangeAnuncio(tipo, objeto){
    if(tipo === 'marca'){
        try{
            setOptMarca(
                {
                    codigo: objeto.value,
                    caption: objeto[objeto.selectedIndex].label,
                    apiFIPE: `https://parallelum.com.br/fipe/api/v1/carros/marcas/${objeto.value}/modelos`
                }
            );
        } 
         catch(e) { 
             console.error(e); 
        }
    }
    else if(tipo === 'modelo'){
        try{
            setOptModelo(
                {
                    codigo: objeto.value,
                    caption: objeto[objeto.selectedIndex].label,
                    apiFIPE: `https://parallelum.com.br/fipe/api/v1/carros/marcas/${optMarca.codigo}/modelos/${objeto.value}/anos`
                }
            );
        } 
         catch(e) { 
             console.error(e); 
        }   
    }
    else if(tipo === 'anos'){
        try{
            setOptAno(
                {
                    codigo: objeto.value,
                    caption: objeto[objeto.selectedIndex].label,
                    apiFIPE: `https://parallelum.com.br/fipe/api/v1/carros/marcas/${optMarca.codigo}/modelos/${optModelo.codigo}/anos/${objeto.value}`
                }
            );
        } 
         catch(e) { 
             console.error(e); 
        }   
    }
}


    async function mudaEvalorInicial(e){
        const valor = setValorInicial(e.target.value);
        setEvalorInicial(valor);
    }
    async function mudaEvalorFinal(e){
        const valor = setValorFinal(e.target.value);
        setEvalorFinal(valor);
    }

    const limpa = function limpaFiltros(){
        setMarca([]);
        setModelo([]);
        setAnoModelo([]);
        setOptMarca('');
        setOptModelo('');
        setOptAno('');
        setValorInicial(null);
        setValorFinal(null);
        setEvalorInicial('');
        setEvalorFinal('');
        setCor('');
        setFiltroAnc({});
    }
    const [limpador, setLimpador] = useState(limpa);

    if(!isEmpty(token)){    
        return(
        <Div>
            <div id="divLink">
                <Link to='/cadAnuncios'>Anunciar um veículo</Link>
            </div>
            <div id="divForm">
                <form id='bordaSelect' onSubmit={(e)=>{dadosFiltro(e)}}>
                    <h4>Filtros</h4>
                    <div id='divMarca'>
                    <label>Marca</label>
                    <br/>
                    <select id='selecaoMarcas' onChange= {(e) => handleChangeAnuncio('marca', e.target)
                        }>
                        <option key='00' value=''> Selecione uma marca </option>
                        {selecaoMarca.map(selecaoMarca => (
                        <option key={selecaoMarca.codigo} value={selecaoMarca.codigo}>{selecaoMarca.nome} </option>
                        ))}
                    </select>
                </div>

                <div id='divModelo'>
                    <label>Modelo</label>
                    <br/>
                    <select id='selecaoModelos' onChange= {(e) => handleChangeAnuncio('modelo',e.target)} className='maxWidthSelect'>
                        <option key='00' value=''> Selecione um modelo </option>
                        {selecaoModelo.map(selecaoModelo => (
                        <option key={selecaoModelo.codigo} value={selecaoModelo.codigo}>{selecaoModelo.nome}</option>
                        ))}    
                    </select>
                </div>

                <div id='divAno'>
                    <label>Ano</label>
                    <br/>
                    <select id='selecaoAnos' onChange= {(e) => handleChangeAnuncio('anos', e.target)}>
                        <option key='00' value=''> Selecione um ano </option>
                        {selecaoAno.map(selecaoAno => (
                        <option key={selecaoAno.codigo} value={selecaoAno.codigo}>{selecaoAno.nome}</option>
                        ))}
                    </select>
                </div>
                
                <div id="divCor">
                    <label htmlFor="corVeiculo">Cor do veículo</label>
                    <br/>
                    <input type="text" name="corVeiculo" id="corVeiculo" value={cor} onChange={e=> setCor(e.target.value)} />
                </div>

                <div id="comboValores">
                    <div id="divValoresInicial">
                        <label htmlFor="vlInicial">Valor inicial</label>
                        <br/>
                        <CurrencyInput 
                            name="vlInicial" 
                            id="vlInicial" 
                            required 
                            placeholder="0,00" 
                            value={evalorInicial}
                            onChange= {e=> mudaEvalorInicial(e)} 
                        />
                    </div>

                    <div id='divX'>
                        <label></label>
                        <br/>
                        <p>X</p>
                    </div>

                    <div id='divValoresFinal'>
                        <label>Valor final</label>
                        <br/>
                        <CurrencyInput 
                            name='vlFinal' 
                            id='vlFinal' 
                            required 
                            placeholder='0,00' 
                            value = {evalorFinal}
                            onChange= {(e)=> mudaEvalorFinal(e)} 
                        />
                    </div>
                </div> 

                <div id='divBtLimpa'>
                    <label></label>
                    <br/>
                    <input name='btLimpar' id='btLimpar' type='Button' value=' Limpar filtros ' onClick={limpa} />
                </div>      

                <div id='divBtFiltra'>
                    <label></label>
                    <br/>
                    <input name='btFiltrar' id='btFiltrar' type='Submit' value=' Filtrar ' />
                </div>

            </form>
            </div>
            <div id="divSection">
                {   existeData
                    ? listVeiculos.map(evento => (

                        <div className="card bg-dark">
                        <h4 id="titulo" className='text-light'>{evento.titulo}</h4>
                        <img className="" src = {evento.fotos.foto1.file} alt = {evento.fotos.foto1.dados && evento.fotos.foto1.dados.name ? evento.fotos.foto1.dados.name : ""}/>
                        <div className="card-body bg-dark">
                            <p className="card-text text-light">{evento.veiculo.descricao}</p>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item bg-dark">
                                <h4 className='text-light'>Dados do veículo:</h4>
                            </li>
                            <li className="list-group-item bg-dark text-light">
                                Marca: {evento.veiculo.marca.caption}<br/>
                                Modelo: {evento.veiculo.modelo.caption}<br/>
                                Ano: {evento.veiculo.ano_modelo.caption}<br/>
                                Cor: {evento.veiculo.cor}<br/>
                                Combustível: {evento.veiculo.combustivel}<br/>
                            </li>
                            <li className="list-group-item bg-dark text-light">
                                <h5>{numberParaReal(evento.veiculo.preco_venda ? evento.veiculo.preco_venda : 0)}</h5>
                            </li>
                        </ul>
                        <div className="card-body">
                            <Link className="text-light bg-dark" to = {"/"+evento.id_usuario} >Anunciante: {evento.usuario}</Link>
                        </div>
                        </div>


                        // <section key = {evento._id} id="sessoes">
                        //         <div>
                        //             <h4 id="titulo"><a href="#">{evento.titulo}</a></h4>
                        //             <div id="esquerda">
                        //                 <img src = {evento.fotos.foto1.file} alt = {evento.fotos.foto1 && evento.fotos.foto1.dados && evento.fotos.foto1.dados.name ? evento.fotos.foto1.dados.name : ''} />
                        //                 <p>{evento.veiculo.descricao}</p>
                        //             </div>
                        //             <div id="direita">
                        //                 <h4>Dados do veículo:</h4>
                        //                 <br/>
                        //                 Marca: {evento.veiculo.marca.caption}<br/>
                        //                 Modelo: {evento.veiculo.modelo.caption}<br/>
                        //                 Ano: {evento.veiculo.ano_modelo.caption}<br/>
                        //                 Cor: {evento.veiculo.cor}<br/>
                        //                 Combustível: {evento.veiculo.combustivel}<br/>
                        //                 <h5>{numberParaReal(evento.veiculo.preco_venda ? evento.veiculo.preco_venda : 0)}</h5>
                        //                 <br/>
                        //                 <Link to = {"/"+token.token.id_usuario} >Anunciante: {token.token.usuario}</Link>
                        //                 <img />
                        //             </div>
                        //         </div>
                        //     <div>
                        //         <hr/>
                        //     </div>
                        // </section>
                    ))
                    : listVeiculos.map(evento => (<p key= {evento.error}>{evento.error}</p>))
                }
                
            </div>
        </Div>
    );
}
else{
    return(<Login/>);
}
}

export default PVeiculos;