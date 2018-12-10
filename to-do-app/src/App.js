import React, { Component } from 'react';
import Form from './Form.js'

class App extends Component {
  render() {
    return (
      <h1 className="title">
        To Do List
        <Form/>
      </h1>
      
    );
  }
}

export default App;
