import logo from './logo.svg';
import './App.css';
import React from 'react';
import Header from './components/header';
import Paragraph from './components/paragraph';
import Formulari from './components/formulari';

class App extends React.Component {
  showMesg(msg) {
    alert('This button works ' + msg)
  }
  render (){
    return (
      <div className='App'>
        <Header logo={logo}/>
        <Paragraph shMsg={this.showMesg} />
        <Formulari/>
      </div>
    )
  }
}

export default App;
