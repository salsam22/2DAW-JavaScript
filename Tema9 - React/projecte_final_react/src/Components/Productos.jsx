import React, { Component, useEffect, useState } from 'react';
import {
	Container,
	Table,
	Button,
} from 'react-bootstrap/';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';

function Listado() {
	const [productos, setProductos] = useState([]);
	useEffect(() => {
		getProductos();
	}, []);

	const getProductos = () => {
		fetch('https://api.tendaciclista.ccpegoilesvalls.es/api/productos', {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				"auth-token": JSON.parse(localStorage.getItem("tk"))
			}
		})
			.then(response => response.json())
			.then(data => {
				console.log(data);
				setProductos(data.data.data);
			});
	};

	const SignupSchema = Yup.object().shape({
		name: Yup.string()
			.min(4, 'El nombre debe de tener más de 4 carácteres.')
			.max(60, 'El nombre debe de tener menos de 60 carácteres,')
			.required('Required'),
		price: Yup.number()
			.min(0, 'El precio debe de ser mayor que 0.')
			.required('Required'),
		size: Yup.string()
			.required('Required'),
	});

	const subirAPI = (value) => {
		console.log(value);
		let talla = value.size.split(" ");
		let product = {
			'nombre': value.name,
			'precio': value.price,
			'tallas': talla
		}
		fetch('https://api.tendaciclista.ccpegoilesvalls.es/api/productos', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'auth-token': JSON.parse(localStorage.getItem("tk")),
			},
			body: JSON.stringify(product)
		})
			.then(response => response.json())
			.then(data => {
				console.log(data);
				//window.location.href = "/productos";
			})
	}

	const modificar = (elem) => {
		console.log(elem);
		fetch('https://api.tendaciclista.ccpegoilesvalls.es/api/productos', {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				"auth-token": JSON.parse(localStorage.getItem("tk"))
			}
		})
			.then(response => response.json())
			.then(data => {
				console.log(data.data.data);

			});
	}

	const modificarApi = (values) => {
		console.log(values);
	}

	return (
		<Container className='mt-3'>
			<h1>Productos</h1>
			<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalCreate">Añadir producto</button>

			<div className="modal fade" id="modalCreate" tabIndex={"-1"} aria-labelledby="formCrear" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="formCrear">Nuevo producto</h5>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<Formik initialValues={{ name: "", price: "", size: "" }}
								validationSchema={SignupSchema}
								onSubmit={values => {
									console.log(values);
									subirAPI(values);
								}}>
								{({ errors, touched }) => (
									<Form>
										<div className='form-group'>
											<label htmlFor='name'>Nombre</label>
											<Field
												type='text'
												name='name'
												autoComplete='off'
												className='form-control'
											/>
											<ErrorMessage
												name='name'
												component='div'
												className='field-error text-danger'
											/>
										</div>
										<div className='form-group'>
											<label htmlFor='price'>Precio</label>
											<Field
												type='number'
												name='price'
												autoComplete='off'
												className='form-control'
											/>
											<ErrorMessage
												name='price'
												component='div'
												className='field-error text-danger'
											/>
										</div>
										<div className='form-group'>
											<label htmlFor='size'>Tallas</label>
											<Field
												type='text'
												name='size'
												className='form-control'
											/>
											<ErrorMessage
												name='size'
												component='div'
												className='field-error text-danger'
											/>
										</div>
										<div className="modal-footer">
											<Button type='submit' className='btn btn-primary mt-3 me-2'>Insertar</Button>
											<Button className='btn btn-primary mt-3' data-bs-dismiss="modal">Cancelar</Button>
										</div>
									</Form>
								)}
							</Formik>
						</div>
					</div>
				</div>
			</div>

			<div className="modal fade" id="modalEdit" tabIndex={"-1"} aria-labelledby="formEditar" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="formEditar">Nuevo producto</h5>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<Formik initialValues={{ name: "", price: "", size: "" }}
								validationSchema={SignupSchema}
								onSubmit={values => {
									console.log(values);
									modificarApi(values)
								}}>
								{({ errors, touched }) => (
									<Form>
										<div className='form-group'>
											<label htmlFor='name'>Nombre</label>
											<Field
												type='text'
												name='name'
												autoComplete='off'
												className='form-control'
											/>
											<ErrorMessage
												name='name'
												component='div'
												className='field-error text-danger'
											/>
										</div>
										<div className='form-group'>
											<label htmlFor='price'>Precio</label>
											<Field
												type='number'
												name='price'
												autoComplete='off'
												className='form-control'
											/>
											<ErrorMessage
												name='price'
												component='div'
												className='field-error text-danger'
											/>
										</div>
										<div className='form-group'>
											<label htmlFor='size'>Tallas</label>
											<Field
												type='text'
												name='size'
												className='form-control'
											/>
											<ErrorMessage
												name='size'
												component='div'
												className='field-error text-danger'
											/>
										</div>
										<div className="modal-footer">
											<Button type='submit' className='btn btn-primary mt-3 me-2'>Insertar</Button>
											<Button className='btn btn-primary mt-3' data-bs-dismiss="modal">Cancelar</Button>
										</div>
									</Form>
								)}
							</Formik>
						</div>
					</div>
				</div>
			</div>

			<Table>
				<thead>
					<tr>
						<th>Descripción</th>
						<th>Precio</th>
						<th>Tallas</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{productos.map(producto => {
						return (
							<tr key={producto._id}>
								<td>{producto.nombre}</td>
								<td>{producto.precio}</td>
								<td>{producto.tallas}</td>
								<td>
									<button id={producto._id} className='btn btn-primary mb-1' data-bs-toggle="modal" data-bs-target="#modalEdit" onClick={() => { }}>
										<i className="bi bi-pencil-square"></i>
									</button>
									<button className='btn btn-danger' onClick={() => { console.log("borrar") }}>
										<i className="bi bi-trash3-fill"></i>
									</button>
								</td>
							</tr>
						)
					})}
				</tbody>
			</Table>

		</Container>
	);
}

export default Listado;