import React, {useState} from 'react';
import {BrowserRouter} from 'react-router-dom';
import './global.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from 'react-bootstrap';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Corpo from './Components/Corpo';

function App() {

  return ( 
      <Container>
        <BrowserRouter>
    
          <Header></Header>
      
          <Corpo></Corpo>

          <Footer></Footer>

        </BrowserRouter>
      </Container>
   );
}

export default App;
