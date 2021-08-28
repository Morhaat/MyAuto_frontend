import Styled from 'styled-components';

const Div = Styled.div`
    padding-top: 10px;  
    text-align: center;
    border-radius: 5px;
    position: fixed;
    width: 300px;
    height: 20%;
    left: calc(50% - 150px);
    background-color: #3c3e4d;
    top: 40%;
    display: ${({loading})=> loading ? 'block': 'none' };
    #divGif{
        width: 50px;
        margin: 0 auto;
        margin-top: 10px;
        img{
            width: 100%;
        }
    }

    @media (max-width: 600px){
        width: 60%;
        height: 15%;
        left: 20%;
    }

`;

export default Div;