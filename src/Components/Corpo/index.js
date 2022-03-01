import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Home from '../Pages/Home';
import Veiculos from '../Pages/Veiculos';
import Contato from '../Pages/Contato';
import Sobre from '../Pages/Sobre';
import CadVeiculos from '../Pages/cadAnuncios';
import Usuario from '../Pages/Usuarios';


// eslint-disable-next-line import/no-anonymous-default-export
export default () => {

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

            <Route exact path='/usuario:id' component={<Usuario/>}>
                          
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