import './App.css';
import React from 'react';
import Header from './Components/Header'
import Footer from './Components/Footer'
import Listado from './Components/Listado'
import Login from './Components/Login'
import Logout from './Components/Logout'
import Register from './Components/Register'
import {
  Routes,
  Route
} from 'react-router-dom';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <React.Fragment>
      <Container>
        <Header />
        <Routes>
          <Route path="/" element={<Listado />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/logout" element={<Logout />}/>
        </Routes>
        <Footer />
      </Container>
    </React.Fragment>
  );
}

export default App;
