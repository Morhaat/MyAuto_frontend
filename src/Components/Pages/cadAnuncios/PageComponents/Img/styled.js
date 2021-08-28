import Styled from 'styled-components';

const Div = Styled.div`
    #divImg{
        position: relative;
        width: ${({image})=>image ? '300px' : '0px'};
        height: ${({image})=>image ? '300px' : '0px'};
        #imgPrincipal{
            width: ${({image})=>image ? '100%' : '0%'};
            height: ${({image})=>image ? '100%' : '0%'};
            display: ${({image})=>image ? 'inline-Block' : 'none'};
            position: absolute;
        }
        #imgBt{
            cursor: pointer;
            transition: .3s;
            opacity: 0%;
            width: 50px;
            height: 50px;
            display: ${({image})=>image ? 'inline-Block' : 'none'};
            position: absolute;
            top: 10px;
            right: 10px;
            border-radius: 50%;
        }
    }
    #divImg:hover{
        #imgBt{
            opacity:60%;
            transition: .3s;
        }
    }
    input{
        display: ${({image})=>image ? 'none' : 'block'};
    }
`;

export default Div;