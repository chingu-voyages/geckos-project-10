import React, { Component } from "react";
import ReactDOM from "react-dom";

const Title = props => {
  return (
    <div className="title-container">
      <h1>My To Do List</h1>
      <p>
        a simple to do app that sends SMS reminders to your phone so you'll
        never forget to finish a task, even when you're on the run.
      </p>
    </div>
  );
};

export default Title;
