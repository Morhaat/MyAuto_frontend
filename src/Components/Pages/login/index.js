import React, {useState, useEffect} from 'react';
import PropTypes  from 'prop-types';
import Div from './styled';
import api from '../../../Services/api';


async function realizaLogin(credentials){
    const chave= credentials;
    api.get('/login', {
        headers: {
            Authorization: `Basic ` +chave //the token is a variable which holds the token
        }
    })
    .then(data => data.data)
    .catch((error) => {
        console.error(error)
    })
}


export default function Login({ setToken }) {
    localStorage.clear();
    const [user, setUser] = useState('');
    const [pswd, setPswd] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        const dados = Buffer.from(`${user}:${pswd}`, 'utf8').toString('base64');
        const token = await realizaLogin(dados);
        localStorage.setItem("Token", token);
        setToken(token);
        console.log(token)
    }

    const mudaUser = event => {
        setUser(event.target.value);
    };

    const mudaPswd = event => {
        setPswd(event.target.value);
    };

    return(
        <Div>
            <form id='formLogin' onSubmit={handleSubmit}>
                <label htmlFor='username'>Usuário</label>
                <br/>
                <input type= "text" name='username' id='username' value={user} onChange={mudaUser}/>
                <br/>
                <label htmlFor='password'>Senha</label>
                <br/>
                <input type= "password" name='password' id='password' value={pswd} onChange={mudaPswd}/>
                <br/> 
                <input type="submit" name="btLogin" id="btLogin" value=" Login "/>
            </form>
        </Div>
    );
}
Login.propTypes = {
    setToken: PropTypes.func.isRequired
}