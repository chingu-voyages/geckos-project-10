import React, { Component } from "react";

const Task = props => {
  {
    var key = 0;
  }

  // console.log('THIS IS PROPS', props.tasks)

  var widthStyle = {
    width: "auto",
    display: "inline"
  };

  return (
    <div>
      <ol style={{ display: "inline-block" }}>
        {props.tasks.map(entry => {
          return (
            <div style={widthStyle}>
              <li>
                <form
                  style={{ display: "inline" }}
                  method="POST"
                  action={`/tasks/${entry._id}?_method=DELETE`}
                >
                  <span style={{ display: "inline" }} key={entry._id}>
                    {" "}
                    {entry.task} {entry.time.toString().split("G")[0]}
                  </span>
                  <button>Delete</button>
                </form>
              </li>
            </div>
          );
        })}
      </ol>
    </div>
  );
};

export default Task;
