import React from "react";
import {
    Form,
    Button,
} from 'react-bootstrap/';

function Logout() {
    return (
        <div>
            <h1>
                Logout
            </h1>
            <h3>
                Quieres salir de tu perfil de usuario?
            </h3>
            <Form>
                <Button variant="primary" type="submit">
                    Salir
                </Button>
            </Form>
        </div>
    )
}

export default Logout;