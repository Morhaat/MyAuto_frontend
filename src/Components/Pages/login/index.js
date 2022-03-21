import React, {useState, useEffect} from 'react';
import PropTypes  from 'prop-types';
import Div from './styled';
import api from '../../../Services/api';
import {useCookies} from 'react-cookie';


async function realizaLogin(credentials){
    const chave= credentials;
    return api.get('/login', {
        headers: {
            Authorization: `Basic ` +chave //the token is a variable which holds the token
        }
    })
    .then(data => data.data)
    .catch((error) => {
        console.error(error)
    })
}


export default function Login() {
    const [user, setUser] = useState('');
    const [pswd, setPswd] = useState('');
    const [msgAlert, setMsgAlert] = useState('');
    const [token, setToken, removeToken] = useCookies(['token']);
    const handleSubmit = async e => {
        e.preventDefault();
        const dados = Buffer.from(`${user}:${pswd}`, 'utf8').toString('base64');
        const token = await realizaLogin(dados);
        if(token.value){
            setToken('token',{token});
            window.sessionStorage.clear();
            window.sessionStorage.setItem('token', token.token);
        }
        else{

            setMsgAlert(token.caso);
            setUser('');
            setPswd('');
            setTimeout(function(){
                setMsgAlert('');
            }, 5000);
        }
        
    }
    const removeCookies = event => {
        removeToken('[object Object]');
        console.log(token);
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
                <br/>
                <label id='alertaLogin'>{msgAlert}</label>
                <br/>
                <br/>
                <input type="button" name="remove" value="Remover" onClick={removeCookies}/>
            </form>
        </Div>
    );
}
/*Login.propTypes = {
    setToken: PropTypes.func.isRequired
}*/