import React from 'react';

import imageCapa from '../../../imgs/capa.jpg';

const PHome = ({cookie})=>{
    return(
        <div id='corpo'>
            <p>{}</p>
            <img src= {imageCapa} alt='' id='imgCapa'/>
        </div>
    );
}

export default PHome;