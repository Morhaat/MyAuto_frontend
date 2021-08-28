import React from 'react';
import Div from './styled';

class Sobre extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            file: null
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event) {
        this.setState({
            file: URL.createObjectURL(event.target.files[0])
        })
    }

    render() {
        return (
            <Div>
                <div>
                    <img src={this.state.file} alt="" />
                </div>
                <div>
                    <input type="file" onChange={this.handleChange} />
                </div>
            </Div>
        );
    }
}

export default Sobre;