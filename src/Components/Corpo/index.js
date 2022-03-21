import React, {useState, useEffect} from 'react';
import {Switch, Route} from 'react-router-dom';

import Home from '../Pages/Home';
import Login from '../Pages/login';
import Veiculos from '../Pages/Veiculos';
import Contato from '../Pages/Contato';
import Sobre from '../Pages/Sobre';
import CadVeiculos from '../Pages/cadAnuncios';
import Usuario from '../Pages/Usuarios';
import api from '../../Services/api';
import { useCookies } from 'react-cookie';

// eslint-disable-next-line import/no-anonymous-default-export

export default ()=>{
    const [token, setToken] = useState()
    const [cookie, setCookie, removeCookie] = useCookies(['token']);
    useEffect(()=>{
        if(sessionStorage.getItem('token')){
            const dados = Buffer.from(`user:${sessionStorage.getItem('token')}`, 'utf8').toString('base64');
            async function getToken(credentials){
                return await api.get('/validating', {
                    headers: {
                        Authorization: `Bearer ` +credentials //the token is a variable which holds the token
                    }
                })
                .then(data => setCookie('token',data.data.user))

                .catch((error) => {
                    removeCookie('token');
                    console.error(error)
                })
            };
            getToken(dados);
        }
    }, []);

    useEffect(()=>{
        console.log(cookie);
    },[cookie]);

    if(!cookie.token){
        console.log('Agora aqui');
        return <Login setToken={setToken}/>   
    }
    return(
        <Switch>
            <Route user={cookie} exact path='/'>
                <Home/>
            </Route>
            
            <Route user={cookie} exact path='/Veiculos'>
                <Veiculos/>                
            </Route>

            <Route user={cookie} exact path='/cadAnuncios'>
                <CadVeiculos/>               
            </Route>

            <Route user={cookie} exact path='/usuario'>
                <Usuario/>
            </Route>

            <Route user={cookie} exact path='/Contato'>
                <Contato/>                
            </Route>

            <Route exact path='/Sobre'>
                <Sobre/>                
            </Route>

            <Route path="*" component={() => <h1>Página não encontrada!</h1>} />
            
        </Switch>
    );

}