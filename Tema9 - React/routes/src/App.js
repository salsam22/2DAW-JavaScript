import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route 
} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Error404 from './components/Error404';
import React from 'react';

function App() {
  return (
    <Router>
      <Header/>
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route exact path="/404">
          <Error404/>
        </Route>
      </Switch>
      <Footer/>
    </Router>
  );
}

export default App;
