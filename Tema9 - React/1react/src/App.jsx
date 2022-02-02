import logo from './logo.svg';
import './App.css';
import React from 'react';

let technologyData = ['React', 'Vue', 'Angular'];
<App title="My title " version={1} tech={technologyData} />

class App extends React.Component {
  render() {
    let h1class = {
      textAlign : "center",
      color : "red",
      fontWeight: "bold"
    }
    let h2Class = {
      color : "darkred"
    }
    return (
      <div class='mt-5 ms-5'>
        <h1 style={h1class}> Styled component</h1>
        <h2 style={h2Class}> Other style</h2>
      </div>
    );
  }
}

export default App;
