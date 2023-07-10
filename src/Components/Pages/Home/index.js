import React, {useState, useEffect} from 'react';
import Login from '../login';
import { isEmpty } from 'lodash';
import Utoken from  '../../../Services/auth';
import {useCookies} from 'react-cookie';
import imageCapa from '../../../imgs/capa.jpg';

const PHome = ({user})=>{
    const [token, setToken, removeToken] = useCookies(['token']);
    useEffect(()=>{
        const dados = sessionStorage.getItem('token');
        Utoken(dados, setToken, removeToken);
    }, [token]);
    
    if(!isEmpty(token)){
        return(
            <div id='corpo'>
                <p>{user}</p>
                <img src= {imageCapa} alt='' id='imgCapa'/>
            </div>
        );
    }
    else{
        return(<Login/>);
    }

    }

export default PHome;