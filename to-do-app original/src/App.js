import React, { Component } from 'react';
import Form from './Form.js'
import Task from './Task.js'


class App extends Component {
 
  constructor (props) {
    super(props)
    this.state = {
      input: '',
      time: '',
      tasks: [
        {
          task: '',
          time: ''
        }
      ]
    
    }
  }


  // handleClick = (event) => {
  //   // console.log('sample click')
  //   event.preventDefault();

  //     const entry = {task:this.state.input, time:this.state.time};
  //     fetch("http://localhost:8080/", {
  //       method: 'POST',
  //       headers:{
  //         "Content-type": "application/json"
  //       },
  //       body: JSON.stringify(entry)
  //     })
  //     .then(response => response.json())
  //     .then(result => console.log(result))
  // }

// handleChangeInput = (entry) => {
//     // const userInput = entry.target.value;
//     this.setState({ input: entry.target.value });
//     // console.log(this.state.input)
//     console.log("entry.target.value", entry.target.value)
//     console.log("entry.target", entry.target)
//     // return userInput;
// }

// handleChangeTime = (entry) => {
//   this.setState({time: entry.target.value});
//   console.log("entry.target.value", entry.target.value)
// }

componentDidMount(){ //does something immedietly on browser on load
  // fetch("http://localhost:8080/tasks/")
  // .then(result => result.json())
  // .then(tasks => this.setState({
  //   tasks: tasks
  // }))

  // setTimeout(() => {
  //   this.setState({
  //       tasks:[{
  //         name:'Hello world!'
  //       }]
  //   })
  // }, 1500)
};

  componentWillMount(){

  // fetch("http://localhost:8080/tasks/")
  // .then(result => result.json())
  // .then(tasks => this.setState({
  //   tasks: tasks
  //   }))

    console.log('I AM COMPONENTWILLMOUNT!')

  }

  render() {
    return (
      <div>
      <h1 className="title">
        To Do Lists
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
