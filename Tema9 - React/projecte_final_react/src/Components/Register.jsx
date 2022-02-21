import React from "react";

import { Formik, Form, Field } from "formik";

import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
    name: Yup.string().min(6, 'Too Short!').max(255, 'Too Long!').required('Required'),
    email: Yup.string().min(6, 'Too Short!').max(1024, 'Too Long!').email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Too Short!').required('Required'),
    passwordc: Yup.string()
            .min(6, 'Too Short!')
            .max(20, 'Too Long!')
            .oneOf([Yup.ref('password'), null], "Passwords don't match!")
            .required('Required'),
});

function Register() {
    return (
        <div>
            <Formik initialValues={{ name: "", email: "", password: ""}}
                validationSchema={SignupSchema}
                onSubmit={values => {
                    console.log(values);
                }}
            >
                {({ errors, touched }) => (
                    <div>

                        <div className="row mb-5">
                            <div className="col-lg-12">
                                <h1 className="mt-5">Registrar nuevo usuario</h1>
                            </div>
                        </div>
                        <Form>
                        <div className="mb-3 row">
                                <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                                <div className="col-sm-10">
                                    <Field
                                        type="text"
                                        name="name"
                                        placeholder="Introduce nombre"
                                        autoComplete="off"
                                        className="form-control"
                                    />
                                    {errors.name && touched.name ?
                                        <div>{errors.name}</div> : null}
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                                <div className="col-sm-10">
                                    <Field
                                        type="email"
                                        name="email"
                                        placeholder="Introduce email"
                                        autoComplete="off"
                                        className="form-control"
                                    />
                                    {errors.email && touched.email ?
                                        <div>{errors.email}</div> : null}
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="password" className="col-sm-2 col-form-label">Contraseña</label>
                                <div className="col-sm-10">
                                    <Field
                                        type="password"
                                        name="password"
                                        placeholder="Introduce contraseña"
                                        className="form-control"
                                    />
                                    {errors.password && touched.password ? (
                                        <div>{errors.password}</div>) : null}
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="passwordc" className="col-sm-2 col-form-label">Repetir contraseña</label>
                                <div className="col-sm-10">
                                    <Field
                                        type="password"
                                        name="passwordc"
                                        placeholder="Introduce contraseña repetida"
                                        className="form-control"
                                    />
                                    {errors.password && touched.password ? (
                                        <div>{errors.password}</div>) : null}
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary btn-block mt-4"
                            >
                                Enviar
                            </button>
                        </Form>
                    </div>
                )}
            </Formik>
        </div>
    )
}

export default Register;