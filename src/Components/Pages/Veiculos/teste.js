import React from 'react'
import CurrencyInput from 'react-currency-input';

const MyApp = React.createClass({
    getInitialState(){
        return ({amount: "0.00"});
    },

    handleChange(event, maskedvalue, floatvalue){
        this.setState({amount: maskedvalue});
    },
    render() {
        return (
            <div>
                <CurrencyInput value={this.state.amount} onChangeEvent={this.handleChange}/>
            </div>
        );
    }
});

export default MyApp