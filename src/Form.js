import React, { Component } from "react";
import Alert from "./Alert.js";
import ReactDOM from "react-dom";
import Menu from "./DropDown";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
// export default class Form extends React.Component { //stateful component

const Form = props => {
  const toClose = false;

  const toggle = e => {
    e.stopPropagation();
    var btn = this;
    var menu = btn.nextSibling;

    while (menu && menu.nodeType != 1) {
      menu = menu.nextSibling;
    }
    if (!menu) return;
    if (menu.style.display !== "block") {
      menu.style.display = "block";
      if (toClose) toClose.style.display = "none";
      toClose = menu;
    } else {
      menu.style.display = "none";
      toClose = false;
    }
  };

  const closeAll = () => {
    toClose.style.display = "none";
  };

  const addEventListener = ("DOMContentLoaded",
  function() {
    document.querySelectorAll(".btn-buy-list").forEach(function(btn) {
      btn.addEventListener("click", toggle, true);
    });
  });

  const onclick = function(event) {
    if (toClose) {
      closeAll.call(event.target);
    }
  };

  return (
    <div id="task-form">
      <form method="POST" action={`/tasks`}>
        <TextField
          required
          // style={{margin: 10}}
          margin="normal"
          variant="outlined"
          name="task"
          type="text"
          placeholder="Type your task"
        />
        <TextField
          required  
          id="form-input-field"        
          // label="Required"
          margin="normal"
          variant="outlined"
          name="time"
          type="datetime-local"
          // onChange={props.time}
        />
        <TextField
          required  
          id="form-input-field"        
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
