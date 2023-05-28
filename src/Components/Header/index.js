import React from 'react';

import { Link } from 'react-router-dom';

import imagemLogo from '../../imgs/logoMyCar-Mini.png';

import Burger from '../BurgerItem';

const PHeader = ()=>{
    return(
        <header id='headerPrincipal' className="row">
            <div id='barLogo' className="col-4 col-lg-4">
                <Link to='/'>
                    <img src= {imagemLogo} alt='Logotipo site MyAuto' id='imgLogo' />
                </Link>
            </div>
            <div className="col-8 col-lg-8 d-flex flex-row-reverse">
                <nav className="navbar navbar-expand-lg d-none d-lg-block">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link to='/' className="nav-link text-white aLink">Página inicial</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white aLink" to='/Veiculos'>Veículos</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white aLink" to='/Contato'>Contato</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white aLink" to='/Sobre'>Sobre</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white aLink" to='/Sair'>Sair</Link>
                    </li>
                </ul>
                </nav>
                <div id='barHide' className="d-flex flex-row-reverse d-lg-none">
                    <Burger/>   
                </div>
            </div>
        </header>
    );
}

export default PHeader;