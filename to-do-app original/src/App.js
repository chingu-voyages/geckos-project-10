import React, { Component } from 'react';
import Form from './Form.js'
import Task from './Task.js'

class App extends Component {
 
  constructor (props) {
    super(props)
    this.state = {
      input: '',
      tasks: []
    }
    // this.handleChangeInput = this.handleChangeInput.bind(this);
    // this.handleClick = this.handleClick.bind(this);
  }

// handleClick = (event) => { 
//   console.log('SAMPLE CLICK');
//   event.preventDefault();
//   this.setState({tasks: [this.state.input]});   //referring to line 9
//   console.log(this.state.tasks)
// }

  render() {
    return (
      <div>
      <h1 className="title">
        To Do List.handleClick
      </h1>
      <Form
        value={this.state.input}
        onSubmit = {this.handleClick} //props that are being passed to Form 
        onChange = {this.handleChangeInput}//refer to props.onChange in Form.js
      />

      
      </div>
    );
  }
}

export default App;
