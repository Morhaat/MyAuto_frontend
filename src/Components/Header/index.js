import React from 'react';

import { Link } from 'react-router-dom';

import imagemLogo from '../../imgs/logoMyCar-Mini.png';

import Burger from '../BurgerItem';

const PHeader = ()=>{
    return(
        <header id='topo'>
            <div id='barLogo'>
                <Link to='/'>
                    <img src= {imagemLogo} alt='' id='imgLogo' />
                </Link>
            </div>
            <ul id='menu'>
                <li> <Link to='/'>Página inicial</Link> </li>
                <li> <Link to='/Veiculos'>Veículos</Link> </li>
                <li> <Link to='/Contato'>Contato</Link> </li>
                <li> <Link to='/Sobre'>Sobre</Link> </li>
            </ul>
            <div id='barHide'>
                <Burger/>   
            </div>
        </header>
    );
}

export default PHeader;