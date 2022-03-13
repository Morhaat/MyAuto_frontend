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
    console.log(cookie);
    useEffect(()=>{
        if (token){
            setCookie(token.token);
        }
    }, [token]);

    if(cookie){
        const dados = Buffer.from(`user:${cookie}`, 'utf8').toString('base64');
        async function getToken(credentials){
            return await api.get('/validating', {
                headers: {
                    Authorization: `Basic ` +credentials //the token is a variable which holds the token
                }
            })
            .then(data => setToken(data.data))
            .catch((error) => {
                console.error(error)
            })
        };
        
        getToken(dados);
        console.log(token);
        if(!token){
            return <Login setToken={setToken}/>    
        }
        else{

        }
    }
    else if(!token){
        return <Login setToken={setToken}/>
    }

    return(
        <Switch>
            <Route exact path='/'>
                <Home/>
            </Route>
            
            <Route exact path='/Veiculos'>
                <Veiculos/>                
            </Route>

            <Route exact path='/cadAnuncios'>
                <CadVeiculos/>               
            </Route>

            <Route exact path='/usuario'>
                <Usuario/>
            </Route>

            <Route exact path='/Contato'>
                <Contato/>                
            </Route>

            <Route exact path='/Sobre'>
                <Sobre/>                
            </Route>

            <Route path="*" component={() => <h1>Página não encontrada!</h1>} />
            
        </Switch>
    );

}