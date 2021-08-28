import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import './global.css';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Corpo from './Components/Corpo';

function App() {
  return ( 
    <BrowserRouter>
    
      <Header></Header>
      
      <Corpo></Corpo>

      <Footer></Footer>

    </BrowserRouter>
   );
}

export default App;
