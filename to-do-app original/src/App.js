import React, { Component } from "react";
import Form from "./Form.js";
import Task from "./Task.js";
import style from "./App.css";
import withStyles from "isomorphic-style-loader/withStyles";

const mainDiv = {
  textAlign: "center"
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: this.props.tasks
    };
  }

  render() {
    return (
      <div style={mainDiv}>
        <h1 className="title" style={{ textAlign: "center" }}>
          To Do List
        </h1>

        <Form />
        <Task tasks={this.state.tasks} />
      </div>
    );
  }
}

export default withStyles(style)(App);
// export default App;
