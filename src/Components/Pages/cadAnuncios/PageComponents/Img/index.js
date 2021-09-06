import React, {useState, useEffect} from 'react';
import Div from './styled';
import btFecha from '../../../../../imgs/btFecha.jpg';



const Img = (props) => {

    const [fileURL, setFileURL] = useState();
    const [stImage, setStImage] = useState(false);

    const filho = props.children;

    useEffect(()=>{
        if (props.file.dados !== undefined){
            const urlFile = props.file.file;
            setFileURL(urlFile);
            setStImage(true);
        }
    },[props.file]);



    function handleClick(){
        setFileURL(null);
        setStImage(false);
        props.setaImg({
            dados: undefined,
            file:"",
        })
    }

    return(
        <Div id="blocoImg" image={stImage}>
            <div id="divImg">
                <img id="imgPrincipal"src={fileURL} alt="Imagem do veículo anunciado"/>
                <img id="imgBt" onClick={handleClick} src={btFecha} alt="botão para excluir imagens selecionadas"/>
            </div>
            {filho}
        </Div>
    );
}

export default Img;