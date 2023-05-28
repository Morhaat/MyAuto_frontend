import React, {useState, useEffect} from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from '../Pages/Home';
import Login from '../Pages/login';
import Veiculos from '../Pages/Veiculos';
import Contato from '../Pages/Contato';
import Sobre from '../Pages/Sobre';
import CadVeiculos from '../Pages/cadAnuncios';
import Usuario from '../Pages/Usuarios';
import { isEmpty } from 'lodash';
import {useCookies} from 'react-cookie';
import Utoken from  '../../Services/auth';
import imageCapa from '../../imgs/logoMyCar404.png';
// eslint-disable-next-line import/no-anonymous-default-export

async function ValidaUser(token, setToken, removeToken){
    const dados = sessionStorage.getItem('token');
    Utoken(dados, setToken, removeToken);

    console.log(token)
    console.log(dados)
    if(!isEmpty(token)){
        return true  
    }
    else{
        return false
    }
}


export default ()=>{
    const [token, setToken, removeToken] = useCookies(['token']);
        return(
            <Switch>
                <Route exact path='/'>
                    {ValidaUser(token, setToken, removeToken) ? <Home/> : <Login/> }
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
    
                <Route path="*" component={() => <div id='corpoInexistente'><img src= {imageCapa} alt='' id='Logo404'/></div>} />
                
            </Switch>
        );
    }