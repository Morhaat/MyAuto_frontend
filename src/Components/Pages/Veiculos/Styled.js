import styled from 'styled-components';

const Div = styled.div`
    #divLink{
        margin: 20px;
        height: 20px;
        a{
            float:right;
            text-decoration: none;
            color: #FFFFFF; 
        }
    }

    .maxWidthSelect{
        max-width: 270px;
    }

    #divForm{
        color: #FFFFFF;
        margin: 20px;
        border: 1px solid #787E9C;
        border-radius: 5px;
        padding: 10px;
        #bordaSelect{
            width:100%;
        }
        #bordaSelect div{
            margin-top: 10px;
            margin-right: 10px;
            display: inline-block;
        }
    } 
    #divSection{
        color: #FFFFFF;
        margin: 20px;
        border: 1px solid #787E9C;
        border-radius: 5px;
        padding: 10px;
        
        #sessoes{
            display: inline-block;
            margin-bottom: 30px;
            a{
                text-decoration: none;
                color: #FFFFFF; 
            }
            #titulo{
                    margin-bottom: 10px;
                }
            #esquerda{
                width: 60%;
                float: left;
                margin-bottom: 20px;
                img{
                    width:100%;
                }
            }
            #direita{
                width: 40%;
                float: right;
                padding-left: 20px; 
            }

        }
    }  

    @media (max-width: 650px){
        #divSection{
            #sessoes{
                display: box;
                margin-bottom: 40px;
                #esquerda{
                    width: 100%;
                    float: center;
                    img{
                        width:100%;
                    }
                }
                #direita{
                    width: 100%;
                    float: center;
                    padding-left: 0px; 
                }
            }
        }
    }
`;

export default Div;