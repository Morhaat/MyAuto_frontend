import React from 'react';

class Img extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            SRC: null,
            file: null,
            myAlt:''
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(source) {
        this.setState({
            file: URL.createObjectURL(source),
            myAlt: source.name
        })
        return this.state.file
    }

    render() {
        return (
            <img src={this.handleChange(this.props.src)} alt={this.state.myAltlt}/>
        );
    }
}

export default Img;