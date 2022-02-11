import './App.css';
import {
    Routes,
    Route
} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Error404 from './components/Error404';
import About from './components/About';
import Categoria from './components/Categoria';
import Contacto from './components/contacto';
import { Container } from 'react-bootstrap';
import React from 'react';

function App() {
    return (
        <React.Fragment>
            <Header />
            <Container>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/categoria/:id" element={<Categoria />} />
                    <Route path="/contacto" element={ <Contacto />}/>
                    <Route path="/404" element={<Error404 />} />
                    <Route path="*" element={<Error404 />} />
                </Routes>
            </Container>
            <Footer />
        </React.Fragment>
    );
}

export default App;
