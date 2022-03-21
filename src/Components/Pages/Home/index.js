import React from 'react';

import imageCapa from '../../../imgs/capa.jpg';

const PHome = ({user})=>{
    return(
        <div id='corpo'>
            <p>{user}</p>
            <img src= {imageCapa} alt='' id='imgCapa'/>
        </div>
    );
}

export default PHome;