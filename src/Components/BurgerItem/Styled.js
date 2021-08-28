
import Styled from 'styled-components';


const Div = Styled.div`
    position: fixed;
    background-color: #595F79;
    border-radius: 5px 0px 0px 5px;
    right: ${({open}) => open ? '0px': '-300px'};
    transition: 0.5s;
    ul li {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px 10px;
    }
    ul li a{
        text-align: center;
        padding: 10px 10px;
        font-size: 20px;
        text-decoration: none;
        color: #FFFFFF;
    }

    ul li:hover{
        background-color: rgb(144, 130, 175);
    }
`;

export default Div;