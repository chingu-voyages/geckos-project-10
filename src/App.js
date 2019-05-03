import React, { Component } from "react";
import Form from "./Form.js";
import Task from "./Task.js";
import style from "./App.css";
import Title from './Title.js';
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
        <Title />
        <Form />
        <Task tasks={this.state.tasks} />
      </div>
    );
  }
}

export default withStyles(style)(App);
