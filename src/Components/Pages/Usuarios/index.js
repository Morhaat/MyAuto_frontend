import React from 'react';
import Div from './styled';
import {useParams} from 'react-router-dom';

const Cad_Usuarios = () => {
    let {id} = useParams();
    return(
    <div>
        <h3>ID: {id}</h3>
    </div>
    );
}

export default Cad_Usuarios;