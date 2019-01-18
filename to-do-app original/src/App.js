import React, { Component } from 'react';
import Form from './Form.js'
import Task from './Task.js'

class App extends Component {
 
  constructor (props) {
    super(props)
    this.state = {
      // IS THIS.STATE SET UP PROPERLY?
      input: '',
      time: '',
      tasks: [{
        name: "",
        time: ""
      }]
    }
  }


  handleClick = (event) => {
    // console.log('sample click')
    event.preventDefault();
      console.log("this.state.tasks", this.state.tasks)
      this.setState({tasks:[{...this.state.tasks, name: this.state.input, time: this.state.time}]})
     
}

handleChangeInput = (entry) => {
    // const userInput = entry.target.value;
    this.setState({ input: entry.target.value });
    // console.log(this.state.input)
    console.log("entry.target.value", entry.target.value)
    console.log("entry.target", entry.target)
    // return userInput;
}

handleChangeTime = (entry) => {
  this.setState({time: entry.target.value});
  console.log(entry.target.value)
}


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
        time ={this.handleChangeTime}
      />

      <Task
        tasks={this.state.tasks} />

      </div>
    );
  }
}

export default App;
