import React, {useState, useEffect} from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from '../Pages/Home';
import Login from '../Pages/login';
import Veiculos from '../Pages/Veiculos';
import Contato from '../Pages/Contato';
import Sobre from '../Pages/Sobre';
import CadVeiculos from '../Pages/cadAnuncios';
import Usuario from '../Pages/Usuarios';
import {useCookies} from 'react-cookie';
import Utoken from  '../../Services/auth';
// eslint-disable-next-line import/no-anonymous-default-export

export default ()=>{
    const [token, setToken, removeToken] = useCookies('[token]');
    removeToken('[object Object]')
    useEffect(()=>{
        if(sessionStorage.getItem('token')){
        }
    }, []);
    const dados = Buffer.from(`user:${sessionStorage.getItem('token')}`, 'utf8').toString('base64');           
    
    useEffect(()=>{
        Utoken(dados, setToken, removeToken);
    },[token]);
    
    console.log(token)

    if(!token){
        return <Login/>   
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

            <Route exact path='/Sair'>
                {setToken}                
            </Route>

            <Route path="*" component={() => <h1>Página não encontrada!</h1>} />
            
        </Switch>
    );

}