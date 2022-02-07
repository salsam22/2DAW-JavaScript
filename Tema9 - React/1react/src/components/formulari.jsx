import React, {Fragment, useState} from "react";

const Formulari = () => {
    const [dades, setDades] = useState({
        nom: '',
        cognom: ''
    })

    const handleImputChange = (event) => {
        console.log(event.target.value);
        setDades({
            ...dades,
            [event.target.name]: event.target.value
        })
    }

    const enviarDades = (event) => {
        event.preventDefault();
        console.log(dades.nom + dades.cognom);
    }

    return (
        <Fragment>
            <h1>Formulari</h1>
            <form className="row" onSubmit={enviarDades}>
                <div className="col md-3">
                    <input
                        placeholder="introdueix el nom"
                        className="form-control"
                        type="input"
                        name="nom"
                        onChange={handleImputChange}
                    />
                </div>
                <div className="col md-3">
                    <input
                        placeholder="introdueix el cognom"
                        className="form-control"
                        type="input"
                        name="cognom"
                        onChange={handleImputChange}
                    />
                </div>
                <div className="col md-3">
                    <button className="btn btn-primary" type="submit" onClick={enviarDades}>
                        Enviar
                    </button>
                </div>
            </form>
        </Fragment>
    )
}

export default Formulari;