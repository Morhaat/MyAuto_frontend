import React, {useState, useEffect} from 'react';
import CurrencyInput from 'react-currency-masked-input';
import axios from 'axios';
import Div from './Styled';
import api from '../../../Services/api';
import Img from './componentImg';
import { Link } from 'react-router-dom';


const PVeiculos = ()=>{ 
    
    const [existeData, setexisteData] = useState(false);
    const [listVeiculos, setListVeiculos] = useState([]);
    const [filtro, setFiltro] = useState({});

    function numberParaReal(numero){
        var formatado = "R$ " + numero.toFixed(2).replace(".",",");
        return formatado;
    }

    useEffect(()=>{
        async function loadAnuncios(){
            await api.get('/anuncios', {filtro})
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
    } ,[filtro])








    return(
        <Div>
            <div id="divLink">
                <Link to='/cadAnuncios'>Anunciar um veículo</Link>
            </div>
            <div id="divForm">
                <form id='bordaSelect'>
                    <h4>Filtros</h4>
                    <div id='divMarca'>
                        <label>Marca</label>
                        <br/>
                        <select id='selecaoMarcas' onChange= "">
                            <option key='00' value=''> Selecione uma marca </option>
                        </select>
                    </div>

                    <div id='divModelo'>
                        <label>Modelo</label>
                        <br/>
                        <select id='selecaoModelos' onChange= "" >
                            <option key='00' value=''> Selecione um modelo </option>   
                        </select>
                    </div>

                    <div id='divAno'>
                        <label>Ano</label>
                        <br/>
                        <select id='selecaoAnos' onChange= "">
                            <option key='00' value=''> Selecione um ano </option>
                        </select>
                    </div>
                
                    <div id="divCor">
                        <label htmlFor="corVeiculo">Cor do veículo</label>
                        <br/>
                        <input type="text" name="corVeiculo" id="corVeiculo" value="Preto" onChange="" />
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
                                value='0.00'
                                onChange= "" 
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
                                value = '0,00'
                                onChange= "" 
                            />
                        </div>
                    </div> 

                    <div id='divBtLimpa'>
                        <label></label>
                        <br/>
                        <input name='btLimpar' id='btLimpar' type='Button' value=' Limpar filtros ' onClick="" />
                    </div>      

                    <div id='divBtFiltra'>
                        <label></label>
                        <br/>
                        <input name='btFiltrar' id='btFiltrar' type='Button' value=' Filtrar ' />
                    </div>

                </form>
            </div>
            <div id="divSection">
                {   existeData
                    ? listVeiculos.map(evento => (
                        <section key = {evento._id} id="sessoes">
                                <div>
                                    <h4 id="titulo"><a href="#">{evento.titulo}</a></h4>
                                    <div id="esquerda">
                                        <img src = {evento.fotos.foto1.file} alt = {evento.fotos.foto1.dados.name} />
                                        <p>{evento.veiculo.descricao}</p>
                                    </div>
                                    <div id="direita">
                                        <h4>Dados do veículo:</h4>
                                        <br/>
                                        Marca: {evento.veiculo.marca.caption}<br/>
                                        Modelo: {evento.veiculo.modelo.caption}<br/>
                                        Ano: {evento.veiculo.ano_modelo.caption}<br/>
                                        Cor: {evento.veiculo.cor}<br/>
                                        Combustível: {evento.veiculo.combustivel}<br/>
                                        <h5>{numberParaReal(evento.veiculo.preco_venda)}</h5>
                                        <br/>
                                        <Link to = {"/"+evento.id_usuario} >Vendedor: {evento.usuario}</Link>
                                        <img />
                                    </div>
                                </div>
                            <div>
                                <hr/>
                            </div>
                        </section>
                    ))
                    : listVeiculos.map(evento => (<p key= {evento.error}>{evento.error}</p>))
                }
                
            </div>
        </Div>
    );

}

export default PVeiculos;

/*
    //Estados dos Selects...............................................................................................
    const [selecaoMarca, setMarca] = useState([]);
    const [selecaoModelo, setModelo] = useState([]);
    const [selecaoAno, setAnoModelo] = useState([]);

    const [optMarca, setOptMarca] = useState('');
    const [optModelo, setOptModelo] = useState('');
    const [optAno, setOptAno] = useState('');

     //Fim dos estados dos Selects...............................................................................................


     //Estados dos Edits de valores do filtro.............................................................................
    const [valorInicial, setValorInicial] = useState(0);
    const [valorFinal, setValorFinal] = useState(0);
    const [evalorInicial, setEvalorInicial] = useState(null);
    const [evalorFinal, setEvalorFinal] = useState();
    const [cor, setCor] = useState('');
    //Fim dos estados dos Edits de valores do filtro.............................................................................


    const [listVeiculos, setListVeiculos] = useState([]);
    const [filtro, setFiltro] = useState({});
    const [existeData, setexisteData] = useState(false);

    function numberParaReal(numero){
        var formatado = "R$ " + numero.toFixed(2).replace(".",",");
        return formatado;
    }

    //'https://parallelum.com.br/fipe/api/v1/carros/marcas'
    useEffect(() => {
        async function loadMarcas(){
            const response = await axios.get();
            setMarca(response.data);
            
        }
        loadMarcas();
    }, []);

    useEffect(() => {
        async function loadModelos(){
            const response = await axios.get(optMarca);
            setModelo(response.data.modelos);
        }
        loadModelos();
    }, [optMarca]);

    useEffect(() => {
        async function loadAnoModelo(){
            const response = await axios.get(optModelo);
            setAnoModelo(response.data);
        }
        loadAnoModelo();
    }, [optModelo]);

   async function mudaEvalorInicial(e){
        const valor = setValorInicial(e.target.value);
        setEvalorInicial(valor);
    }
   async function mudaEvalorFinal(e){
        const valor = setValorFinal(e.target.value);
        setEvalorFinal(valor);
    }

    useEffect(()=>{
        async function loadAnuncios(){
            await api.get('/anuncios', {filtro})
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
    } ,[filtro]);


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
        setFiltro({});
    }
    const [limpador, setLimpador] = useState(limpa);

   return(
        <Div>
            <div id="divLink">
                <Link to='/cadAnuncios'>Anunciar um veículo</Link>
            </div>
            <div id="divForm">
            <form id='bordaSelect'>
                <h4>Filtros</h4>
                <div id='divMarca'>
                    <label>Marca</label>
                    <br/>
                    <select id='selecaoMarcas' onChange= {(e) => setOptMarca(
                        `https://parallelum.com.br/fipe/api/v1/carros/marcas/${e.target.value}/modelos`)
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
                    <select id='selecaoModelos' onChange= {(e) => setOptModelo(`${optMarca}/${e.target.value}/anos`)} >
                        <option key='00' value=''> Selecione um modelo </option>
                        {selecaoModelo.map(selecaoModelo => (
                        <option key={selecaoModelo.codigo} value={selecaoModelo.codigo}>{selecaoModelo.nome}</option>
                        ))}    
                    </select>
                </div>

                <div id='divAno'>
                    <label>Ano</label>
                    <br/>
                    <select id='selecaoAnos' onChange= {(e) => setOptAno(`${optModelo}/${e.target.value}`)}>
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
                    <input name='btFiltrar' id='btFiltrar' type='Button' value=' Filtrar ' />
                </div>

            </form>
            </div>
            <div id="divSection">
                {   existeData
                    ? listVeiculos.map(evento => (
                        <section key = {evento._id} id="sessoes">
                                <div>
                                    <h4 id="titulo"><a href="#">{evento.titulo}</a></h4>
                                    <div id="esquerda">
                                        <img src = {evento.fotos.foto1.file} alt = {evento.fotos.foto1.dados.name} />
                                        <p>{evento.veiculo.descricao}</p>
                                    </div>
                                    <div id="direita">
                                        <h4>Dados do veículo:</h4>
                                        <br/>
                                        Marca: {evento.veiculo.marca.caption}<br/>
                                        Modelo: {evento.veiculo.modelo.caption}<br/>
                                        Ano: {evento.veiculo.ano_modelo.caption}<br/>
                                        Cor: {evento.veiculo.cor}<br/>
                                        Combustível: {evento.veiculo.combustivel}<br/>
                                        <h5>{numberParaReal(evento.veiculo.preco_venda)}</h5>
                                        <br/>
                                        <Link to = {"/"+evento.id_usuario} >Vendedor: {evento.usuario}</Link>
                                        <img />
                                    </div>
                                </div>
                            <div>
                                <hr/>
                            </div>
                        </section>
                    ))
                    : listVeiculos.map(evento => (<p key= {evento.error}>{evento.error}</p>))
                }
                
            </div>
        </Div>
    ); 
   
*/
