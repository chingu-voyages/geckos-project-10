import React, { Component } from "react";
import Alert from "./Alert.js";
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
// export default class Form extends React.Component { //stateful component

const Form = props => {

  return (
    <div id='task-form'>
      <form method="POST" action={`/tasks`}>
        <TextField
          required
          className=''
          margin="normal"
          variant="outlined"
          name="task"
          type="text"
          placeholder="Type your task"
        />
        <TextField
          required
          // label="Required"
          margin="normal"
          variant="outlined"
          name="time"
          type="datetime-local"
          // onChange={props.time}
        />
        <TextField
          required
          name="number"
          type="text"
          // onChange={props.number}
          placeholder="Type your number"
          margin="normal"
          variant="outlined"
        />
        <br />
        <Button
          id="submit-button"
          type="submit"
          variant="contained"
          color="primary"
          margin="normal"
          size="large"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Form;

// render(){

//     return (
// <div>
// <form>
//     <input name="task" type="text" value={this.props.input} onChange = {this.handleChangeInput}  placeholder="Type your task" /><br></br>
//     {/* how to access 'name' from input tag? */}

//     <Alert />

//     <button onClick={this.handleClick} >Submit</button>

// </form>
//  <Task item={this.props.form} />
// </div>

//     )
// }

// }
