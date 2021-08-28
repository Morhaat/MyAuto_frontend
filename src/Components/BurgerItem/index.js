import React, {useState} from 'react';
import Div from './Styled';
import { Link } from 'react-router-dom';
import { Spin as Hamburger } from 'hamburger-react'


const Burger = () => {
    const [isOpen, setOpen] = useState(false);
    return(
        <div id='caixaMenu'>
        <Hamburger color='#FeFeFe' toggled={isOpen} toggle={setOpen}
        
        />
        <Div open={isOpen}>
            <ul id='menuBurger'>
                <li> <Link onClick= {()=>setOpen(false)} to='/'>Página inicial</Link> </li>
                <li> <Link onClick= {()=>setOpen(false)} to='/Veiculos'>Veículos</Link> </li>
                <li> <Link onClick= {()=>setOpen(false)} to='/Contato'>Contato</Link> </li>
                <li> <Link onClick= {()=>setOpen(false)} to='/Sobre'>Sobre</Link> </li>
            </ul>
        </Div>
        </div>

    );
}

export default Burger;