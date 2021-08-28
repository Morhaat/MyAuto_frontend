import React, {useState, useEffect} from 'react';
import Div from './styled';
import ajax_load from '../../../../../imgs/ajax-loader.gif';



const FrameLoad = (props) => {
 
    return(
        <Div id="blocoLoad" loading={props.loading}>
            <p>{props.messageStatus}</p>
            <div id="divGif">
                <img id=""src={ajax_load} alt=""/>
            </div>
        </Div>
    );
}

export default FrameLoad;