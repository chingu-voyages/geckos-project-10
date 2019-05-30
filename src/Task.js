import React, { Component } from "react";
import Button from "@material-ui/core/Button";

const Task = props => {
  return (
    <div>
      <ol>
        {props.tasks.map(entry => {
          return (
            <div id="task-container">
              <li>
                <form
                  method="POST"
                  action={`/tasks/${entry._id}?_method=DELETE`}
                >
                  <span className="userTask" key={entry._id}>
                    <div className="entry-task">{entry.task}</div> due on{" "}
                    <div className="entry-time">{entry.time.toString().split("G")[0]}</div>
                  </span>
                  <button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    size="small"
                    className="delete-button"
                  >
                    x
                  </button>
                  <br />
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
