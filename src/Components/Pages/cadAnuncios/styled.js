    import styled from 'styled-components';

const Div = styled.div`
    #divForm{
        color: #FFFFFF;
        margin: 20px;
        border: 1px solid #787E9C;
        border-radius: 5px;
        padding: 10px;
        #bordaSelect{
            width:100%;

            #divTitulo{
                display: block;
                #titulo{
                    width : 350px;
                    box-sizing : border-box;
                }
            }

            #divDescricao{
                display: block;   
            }
        }
        #bordaSelect div{
            margin-top: 10px;
            margin-right: 10px;
            display: inline-block;
        }


    }

    #divBtAnuncio{
        width: 100%;
        height: 30px;
        position: relative;
        #btAnuncio{
            position: absolute;
            width: 10%;
            height: 30px;
            right: 0px;
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
        #divBtAnuncio{
            #btAnuncio{
                width: 100px;
            }
        }

        #divForm{
            #bordaSelect{
                #divTitulo {
                    #titulo{
                        width:100%;
                    }
                }
                #divDescricao{
                    #descricao{
                        width: 100%;
                    }
                }
            }
        }
    }

`;


export default Div;