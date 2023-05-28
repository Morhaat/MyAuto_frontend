import styled from 'styled-components';
import Login from './index';

const Div = styled.div`
    margin-top:50px;
    Label{
        color: #FFFFFF;
    }
    #formLogin{
        display: flex;
        flex-direction: column;
    }
    input{
        border-radius:25px; 
        text-align: center;
    }
    a{
        margin-top: 10px;
        margin-left: 10px;
    }
    button{
        border-radius: 25px;
        margin-top: 10px;
    }
    form{
        background-color: rgba(121, 121, 121, 0.377);
        border-radius: 25px;
        padding: 30px;
    }
    #alertaLogin{
        color: Red;
    }
`;

export default Div;