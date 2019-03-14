import React, {Component} from 'react';

const Task = props => {

    {var key= 0}
    
    // {console.log('THIS IS PROPS', props.todoTasks)}

  return(
        <div>
                <ol>
                    {console.log('THIS IS INSIDE THE RETURN',props.todoTasks)}
                    {/* {props.todoTasks.map(entry => {
                        return(
                            <div>
                                 <li key={entry._id}> {entry.task} {entry.time}</li> 
                            </div>
                        )
                    })
                } */}
                </ol>
        </div>
    )

};

export default Task  

