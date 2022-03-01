import React, {useState, useEffect} from 'react';
import CurrencyInput from 'react-currency-masked-input';
import axios from 'axios';
import Div from './styled';
import api from '../../../Services/api';
import Img from './PageComponents/Img';
import FrameLoad from './PageComponents/FrameLoad';
import {Link} from 'react-router-dom';


const CadVeiculos = ()=>{  

    const [maxSize, setMaxSize] = useState(10485760);
    //Estados dos Selects...............................................................................................
    const [selecaoMarca, setMarca] = useState([]);
    const [selecaoModelo, setModelo] = useState([]);
    const [selecaoAno, setAnoModelo] = useState([]);
    const [dadosFipe, setDadosFipe] = useState('');
    const [titulo, setTitulo] = useState('');
    const [cor, setCor] = useState('');
    const [kilometragem, setKilometragem] = useState('');
    const [descricao, setDescricao] = useState('');
    const [packFotos, setPackFotos] = useState([]);
    const [statusLoad, setStatusLoad] = useState(false);
    const [messageStatus, setMessageStatus] = useState(' ');

    const [foto1, setFoto1] = useState({
        dados:undefined,
        file:""
    });
    const [foto2, setFoto2] = useState({
        dados:undefined,
        file:""
    });
    const [foto3, setFoto3] = useState({
        dados:undefined,
        file:""
    });
    const [foto4, setFoto4] = useState({
        dados:undefined,
        file:""
    });
    const [foto5, setFoto5] = useState({
        dados:undefined,
        file:""
    });

    const [optMarca, setOptMarca] = useState({
        value:'',
        caption: '',
        link: ''
    });
    const [optModelo, setOptModelo] = useState({
        value:'',
        caption: '',
        link: ''
    });
    const [optAno, setOptAno] = useState({
        value:'',
        caption: '',
        link: ''
    });

     //Fim dos estados dos Selects...............................................................................................

     //Estados dos Edits de valores do filtro.............................................................................
     const [valor, setValor] = useState(null);
     const [evalor, setEvalor] = useState(null);
    //Fim dos estados dos Edits de valores do filtro.............................................................................
    
    async function mudaEvalor(e){
        const valor = setValor(e.target.value);
        setEvalor(valor);
    }

    const [listVeiculos, setListVeiculos] = useState([]);
    const [filtro, setFiltro] = useState({});
    const [existeData, setexisteData] = useState(false);

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
    
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
    
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
      };
    
    function limpaDados(){
        setMarca([]);
        setModelo([]);
        setAnoModelo([]);
        setDadosFipe([]);
        setTitulo('');
        setCor('');
        setKilometragem('');
        setDescricao('');
        setValor(0);
        setEvalor(0);
        setFoto1({
            dados:undefined,
            file:null
        });
        setFoto2({
            dados:undefined,
            file:null
        });
        setFoto3({
            dados:undefined,
            file:null
        });
        setFoto4({
            dados:undefined,
            file:null
        });
        setFoto5({
            dados:undefined,
            file:null
        });
    };

    async function loadImages(div, evento){
        const objeto = evento.target.files[0];
        const base64 = await convertBase64(objeto);
        if(objeto.size < maxSize){
            switch (div) {
                case 1:
                    setFoto1({
                        dados: {name:objeto.name,
                            lastModified: objeto.lastModified,
                            lastModifiedDate: objeto.lastModifiedDate,
                            size: objeto.size,
                            type: objeto.type
                            },
                        file: base64
                    });
                    break;
                case 2:
                    setFoto2({
                        dados: {name:objeto.name,
                            lastModified: objeto.lastModified,
                            lastModifiedDate: objeto.lastModifiedDate,
                            size: objeto.size,
                            type: objeto.type
                            },
                        file: base64
                    });
                    break;
                case 3:
                    setFoto3({
                        dados: {name:objeto.name,
                            lastModified: objeto.lastModified,
                            lastModifiedDate: objeto.lastModifiedDate,
                            size: objeto.size,
                            type: objeto.type
                            },
                        file: base64
                    });
                break;
                case 4:
                    setFoto4({
                        dados: {name:objeto.name,
                            lastModified: objeto.lastModified,
                            lastModifiedDate: objeto.lastModifiedDate,
                            size: objeto.size,
                            type: objeto.type
                            },
                        file: base64
                    });
                    break;
                case 5:
                    setFoto5({
                        dados: {name:objeto.name,
                            lastModified: objeto.lastModified,
                            lastModifiedDate: objeto.lastModifiedDate,
                            size: objeto.size,
                            type: objeto.type
                            },
                        file: base64
                    });
                    break;
        
                default:
                    alert('Necessário setar o index do objeto de 1 a 5');
                    break;
            } 
            setMaxSize(maxSize-objeto.size);
        }
        else{
            alert("Você excedeu o limite de 10mb total de todas as imagens");
        }           
    }

    useEffect(() => {
        async function loadMarcas(){
            const response = await axios.get('https://parallelum.com.br/fipe/api/v1/carros/marcas');
            setMarca(response.data);
        }
        loadMarcas();
    }, [selecaoMarca]);

    useEffect(() => {
        async function loadModelos(){
            const response = await axios.get(optMarca.link);
            setModelo(response.data.modelos);
        }
        loadModelos();
    }, [optMarca]);

    useEffect(() => {
        async function loadAnoModelo(){
            const response = await axios.get(optModelo.link);
            setAnoModelo(response.data);
        }
        loadAnoModelo();
    }, [optModelo]);

    useEffect(() => {
        async function loadAnoModelo(){
            const response = await axios.get(optAno.link);
            setDadosFipe(response.data);
        }
        loadAnoModelo();
    }, [optAno]);

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
                    console.log(response.data.resultFiltro); 
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


    async function handleChange(tipo, objeto){
        if(tipo === 'marca'){
            try{
                setOptMarca(
                    {
                        codigo: objeto.value,
                        caption: objeto[objeto.selectedIndex].label,
                        link: `https://parallelum.com.br/fipe/api/v1/carros/marcas/${objeto.value}/modelos`
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
                        link: `https://parallelum.com.br/fipe/api/v1/carros/marcas/${optMarca.codigo}/modelos/${objeto.value}/anos`
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
                        link: `https://parallelum.com.br/fipe/api/v1/carros/marcas/${optMarca.codigo}/modelos/${optModelo.codigo}/anos/${objeto.value}`
                    }
                );
            } 
             catch(e) { 
                 console.error(e); 
            }   
        }
    }

    async function handleSubmit(evento){
        evento.preventDefault();
        setStatusLoad(true);
        setMessageStatus('Loading data...');
        if(optMarca.codigo === undefined && optModelo.codigo === undefined && optAno.codigo === undefined){
            alert('Selecione as opções de marca, modelo e ano do veículo!');
        }
        else{
            console.log('Gerando dados para inserção no banco........');
            const geraDados = {
                id_usuario:'idUsuario',
                usuario: 'usuario',
                ativo:true,
                data_anuncio: Date.now(),
                titulo:titulo,
                veiculo:{
                    fipe_codigo: dadosFipe.CodigoFipe,
                    marca: optMarca,
                    modelo: optModelo,
                    ano_modelo: optAno,
                    combustivel: dadosFipe.Combustivel,
                    preco_venda: evalor,
                    data_venda: null,
                    venda_plataforma: null,
                    kilometragem: kilometragem,
                    cor: cor,
                    descricao: descricao
                },
                fotos: {
                    foto1: foto1,
                    foto2: foto2,
                    foto3: foto3,
                    foto4: foto4,
                    foto5: foto5
                }
            };
            console.log(geraDados);
            const response = await api.post('/cadastroAnuncio', geraDados);
            if(response.data.value){
                setMessageStatus('Anuncio registrado com sucesso! - ');
            }
            console.log(response.data);
            setTimeout(function(){
                setStatusLoad(false);
                limpaDados();
            }, 3000);
        }
    }

    function numberParaReal(numero){
        var formatado = "R$ " + numero.toFixed(2).replace(".",",");
        return formatado;
    }

    return(
        <Div>
            <div id="divForm">
            <FrameLoad loading={statusLoad} messageStatus={messageStatus}/>
            <form id='bordaSelect' onSubmit={e=> handleSubmit(e)}>
                <h4>Cadastrar um anúncio</h4>

                <div id="divTitulo">
                    <label htmlFor="titulo">Título do anúncio</label>
                    <br/>
                    <input  required type="Text" id= "titulo" name= "titulo" value= {titulo} onChange={e=> setTitulo(e.target.value)}/>
                </div>

                <div id="divDescricao">
                    <label htmlFor="descricao">Descrição</label>
                    <br/>
                    <textarea required id="descricao" rows="5" cols="50" maxLength="200" value={descricao} onChange={e=> setDescricao(e.target.value)}></textarea>
                </div>

                <div id='divMarca'>
                    <label>Marca</label>
                    <br/>
                    <select id='selecaoMarcas' onChange= {(e) => handleChange('marca', e.target)
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
                    <select id='selecaoModelos' onChange= {(e) => handleChange('modelo',e.target)} >
                        <option key='00' value=''> Selecione um modelo </option>
                        {selecaoModelo.map(selecaoModelo => (
                        <option key={selecaoModelo.codigo} value={selecaoModelo.codigo}>{selecaoModelo.nome}</option>
                        ))}    
                    </select>
                </div>

                <div id='divAno'>
                    <label>Ano</label>
                    <br/>
                    <select id='selecaoAnos' onChange= {(e) => handleChange('anos', e.target)}>
                        <option key='00' value=''> Selecione um ano </option>
                        {selecaoAno.map(selecaoAno => (
                        <option key={selecaoAno.codigo} value={selecaoAno.codigo}>{selecaoAno.nome}</option>
                        ))}
                    </select>
                </div>

                <div id="divCor">
                    <label htmlFor="cor">Cor</label>
                    <br/>
                    <input 
                        name="cor" 
                        id="cor" 
                        required 
                        placeholder="Cor do veículo" 
                        value={cor}
                        onChange= {e=> setCor(e.target.value)} 
                    />
                </div> 

                <div id="divKm">
                    <label htmlFor="kilometragem">kilometragem</label>
                    <br/>
                    <input 
                        name="kilometragem" 
                        id="kilometragem" 
                        type="number"
                        required 
                        placeholder="Kilometragem do veículo" 
                        value={kilometragem}
                        onChange= {e=> setKilometragem(e.target.value)} 
                    />
                </div> 

                <div id="divValores">
                    <label htmlFor="vlInicial">Valor do veículo</label>
                    <br/>
                    <CurrencyInput 
                        name="vlInicial" 
                        id="vlInicial" 
                        required 
                        placeholder="0,00" 
                        value= {evalor}
                        onChange= {e=> mudaEvalor(e)} 
                    />
                </div>  
                <div id="comboImages">
                    Restantes: {maxSize}kb
                    <br/>
                    <Img file={foto1} setaImg={setFoto1}>
                        <div>
                            <input type="file" value={e=> e.target.value = foto1} onChange={e=> loadImages(1, e)} /> 
                        </div>
                    </Img>

                    <Img file={foto2} setaImg={setFoto2}>
                        <div>
                            <input type="file" value={e=> e.target.value = foto2} onChange={e=> loadImages(2, e)} /> 
                        </div>
                    </Img>

                    <Img file={foto3} setaImg={setFoto3}>
                        <div>
                            <input type="file" value={e=> e.target.value = foto3} onChange={e=> loadImages(3, e)} /> 
                        </div>
                    </Img>

                    <Img file={foto4} setaImg={setFoto4}>
                        <div>
                            <input type="file" value={e=> e.target.value = foto4} onChange={e=> loadImages(4, e)} /> 
                        </div>
                    </Img>

                    <Img file={foto5} setaImg={setFoto5}>
                        <div>
                            <input type="file" value={e=> e.target.value = foto5} onChange={e=> loadImages(5, e)} /> 
                        </div>
                    </Img>

                </div>

                <div id='divBtAnuncio'>
                    <input name="btAnuncio" id="btAnuncio" type="submit" form="bordaSelect" value=' Anunciar ' />
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
                                        <Link to = {"/usuario:"+evento.id_usuario} >Vendedor: {evento.usuario}</Link>
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

export default CadVeiculos;