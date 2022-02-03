import logo from './logo.svg';
import './App.css';
import React from 'react';
import PropTypes from 'prop-types';

class App extends React.Component {
  static defaultProps = {
    title: "Default title",
      version: 0,
    }
    
    render() {
      const title = this.props.title;
      const tech = this.props.tech;
      const version = this.props.version;
      
      return (
        <div>
        <h1>{title}</h1>
        <h2>{tech[0]}</h2>
        <h3>{version}</h3>
      </div>
    );
  }
}

App.propTypes = {
  title: PropTypes.string.isRequired,
  version: PropTypes.number.isRequired
}
export default App;
