import React, {useState, useEffect} from 'react';
import PropTypes  from 'prop-types';
import api from '../../../Services/api';
import {useCookies} from 'react-cookie';
import Div from './styled';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import {Switch, Route} from 'react-router-dom';
import Home from '../Home';


async function realizaLogin(credentials){
    const chave = credentials;
    return api.get('login', {
        headers: {
            'Authorization': `Basic ${chave}`//the token is a variable which holds the token
        }
    })
    .then((data) => data.data)
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
            return(
                <Switch>
                    <Route exact path='/'>
                        <Home/>
                    </Route>
                </Switch>
            );
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
            <div className="row"> 
                <form id='formLogin' className="col-10 col-lg-4 m-auto" onSubmit={handleSubmit}>
                <div class="form-group">
                    <label htmlFor="exampleInputEmail1">Usuário</label>
                    <input type="username" className="form-control col-4" aria-describedby="emailHelp" placeholder="Entre com o usuário" name='username' id='username' value={user} onChange={mudaUser}/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Senha</label>
                    <input type="password" className="form-control col-4" placeholder="Senha"name='password' id='password' value={pswd} onChange={mudaPswd}/>
                </div>
                <div id="divEsqueci">
                    <Link className="nav-link text-white">Esqueci minha senha.</Link>
                </div>
                <button type="submit" className="btn btn-secondary" name="remove" value="Entrar" >Entrar</button>
                <br/>
                <label id='alertaLogin'>{msgAlert}</label>
                </form>
            </div>
        </Div>
    );
}