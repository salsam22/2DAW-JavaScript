import React from 'react';

class Moneda extends React.Component {

    handleChange(evt) {
        this.props.obtenerMoneda(evt.target.name, evt.target.value)
    }

    render() {

        return (
            <input
                type='number'
                value={this.props.valor}
                name={this.props.tipoMoneda}
                className="form-control"
                onChange={(evt) => this.handleChange(evt)}
            >
            </input>
        )

    }

}
export default Moneda;