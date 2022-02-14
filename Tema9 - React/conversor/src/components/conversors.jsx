import React from "react";
import Moneda from './moneda';

class Conversor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dollars: 0,
            euros: 0
        }
    }

    financial(x) {
        return Number.parseFloat(x).toFixed(2);
    }

    obtener(tipoMoneda, valor) {
        valor = parseFloat(valor);
        if (tipoMoneda === "euros") {
            this.setState({
                dollars: this.financial(valor / this.props.canvi),
                euros: valor
            })
        } else {
            this.setState({
                dollars: valor,
                euros: this.financial(valor * this.props.canvi)
            })
        }
        console.log(this.state);
    }

render () {
    return (
        <div className="form-row">
            <div className="form-group col-auto">
                <label  className="col-sm-2 col-form-label" >Dollars</label>
                <Moneda 
                    valor = {this.state.dollars}
                    tipoMoneda = 'dollars'
                    obtenerMoneda = {(tipoMoneda, valor) => this.obtener(tipoMoneda, valor)}
                /> 
            </div>
            <div className="col">
                <label className="col-sm-2 col-form-label" >Euros</label>
                <Moneda 
                    valor = {this.state.euros}
                    tipoMoneda = 'euros'
                    obtenerMoneda = {(tipoMoneda, valor) => this.obtener(tipoMoneda, valor)}
                /> 
            </div>
        </div>    
    )
}
}

export default Conversor;