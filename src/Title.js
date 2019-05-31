import React, { Component } from "react";
import ReactDOM from "react-dom";

const Title = props => {
  return (
    <div className="title-container">
      <h1>My To Do List</h1>
      <p>
        Keep all your tasks in one place and receive SMS reminders when they're due 
      </p>
    </div>
  );
};

export default Title;
