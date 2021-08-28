import React, {useState, useEffect} from 'react';
import Div from './styled';
import btFecha from '../../../../../imgs/btFecha.jpg';



const Img = (props) => {

    const [fileURL, setFileURL] = useState();
    const [stImage, setStImage] = useState(false);

    const filho = props.children;

    useEffect(()=>{
        if (props.file.Url !== undefined){
            const urlFile = URL.createObjectURL(props.file.File);
            setFileURL(urlFile);
            setStImage(true);
        }
    },[props.file]);



    function handleClick(){
        setFileURL(null);
        setStImage(false);
        props.setaImg({
            Url: undefined,
            File:{},
            Passei:'Passou'
        })
    }

    return(
        <Div id="blocoImg" image={stImage}>
            <div id="divImg">
                <img id="imgPrincipal"src={fileURL} alt=""/>
                <img id="imgBt" onClick={handleClick} src={btFecha} alt="botão para excluir imagens selecionadas"/>
            </div>
            {filho}
        </Div>
    );
}

export default Img;