import React from "react";

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

    cambioMoneda(evt) {
        console.log(evt.target.name, evt.target.value);
        let valor = parseFloat(evt.target.value);
        if (evt.target.name === "euros") {
            this.setState({
                dollars: this.financial(valor / this.props.canvi),
                euros: evt.target.value
            })
        } else {
            this.setState({
                dollars: evt.target.value,
                euros: this.financial(valor * this.props.canvi)
            })
        }
        console.log(this.state);
    }

    render() {
        console.log(this.props.canvi);
        return (
            <div className="form-row">
                <div className="form-group col-auto">
                    <div className="col">

                        <label className="col-sm-2 col-form-label" >Dollars</label>
                        <input
                            type='number'
                            value={this.state.dollars}
                            name="dollars"
                            className="form-control"
                            onChange={(evt) => this.cambioMoneda(evt)}
                        >
                        </input>
                    </div>
                    <div className="col">
                        <label className="col-sm-2 col-form-label" >Euros</label>
                        <input
                            type='number'
                            value={this.state.euros}
                            name="euros"
                            className="form-control"
                            onChange={(evt) => this.cambioMoneda(evt)}
                        >
                        </input>
                    </div>
                </div>
            </div>
        )
    }
}

export default Conversor;