import React, { Component } from "react";
import Button from "@material-ui/core/Button";

const Task = props => {
  // {
  //   var key = 0;
  // }

  // console.log('THIS IS PROPS', props.tasks)

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
                  <span className='userTask' key={entry._id}>
                    {entry.task}
                    <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    size="small"
                  >
                    x
                  </Button>
                    <br />
                     {entry.time.toString().split("G")[0]}
                  </span>
                
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
