import React from 'react';
import Div from './styled';
import {useParams} from 'react-router-dom';
//import api from '../../../Services/api';

const Cad_Usuarios = async () => {
    let {id} = useParams();
    //const response = await api.post('/login', {});
    return(
    <Div>
        <div id="principal">
            <h3>Usuário: {id}</h3>
        </div>
    </Div>
    );
}

export default Cad_Usuarios;