import React, {useState, useEffect} from 'react';

class CadAnuncio extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            fileURL: null,
            file: null,
            stImage: false,
            selecaoMarca: [],
            optMarca: '',
            selecaoModelo: [],
            optModelo: ''
        }
        this.selectMarca = this.selectMarca.bind(this)
        this.selectModelo = this.selectModelo.bind(this)
        this.setOptMarca = this.setOptMarca.bind(this)
        this.setOptModelo = this.setOptModelo.bind(this)
    }

    setOptMarca(){
        alert('foi')
    }

    setOptModelo(){
        return (
            console.log('3')
        )
    }

    selectMarca(){
        return(
            console.log('1')   
        );
    } 

    selectModelo(){
        return(
            console.log('2')
        );
    }

    render(){
        return(
            <form>
                <div id='divMarca'>
                    <label>Marca</label>
                    <br/>
                    <select id='selecaoMarcas' onChange= {(e) => this.setOptMarca(
                        `https://parallelum.com.br/fipe/api/v1/carros/marcas/${e.target.value}/modelos`)
                        }>
                        <option key='00' value=''> Selecione uma marca </option>
                        {this.selecaoMarca.map(selecaoMarca => (
                        <option key={selecaoMarca.codigo} value={selecaoMarca.codigo}>{selecaoMarca.nome} </option>
                        ))}
                    </select>
                </div>

                <div id='divModelo'>
                    <label>Modelo</label>
                    <br/>
                    <select id='selecaoModelos' onChange= {(e) => this.setOptModelo(`${this.optMarca}/${e.target.value}/anos`)} >               
                        <option key='00' value=''> Selecione um modelo </option>
                        {this.selecaoModelo.map(selecaoModelo => (
                        <option key={selecaoModelo.codigo} value={selecaoModelo.codigo}>{selecaoModelo.nome}</option>
                        ))}    
                    </select>
                </div>
            </form>
        );
    }

}

export default CadAnuncio;