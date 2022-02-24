import React from "react";
import {
    Button,
    Table,
} from 'react-bootstrap/';

function Listado() {
    const prod = () => {
        fetch('https://api.tendaciclista.ccpegoilesvalls.es/api/login', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            'auth-token': JSON.parse(localStorage.getItem("tk")),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
    }
    return (
        <div>
            <h1>
                Productos
            </h1>
            <Button variant="primary">
                Agregar Producto
            </Button>
            <div>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Table heading</th>
                            <th>Table heading</th>
                            <th>Table heading</th>
                            <th>Table heading</th>
                            <th>Table heading</th>
                            <th>Table heading</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default Listado;