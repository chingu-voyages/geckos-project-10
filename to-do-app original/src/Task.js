import React, {Component} from 'react';

const Task = props => {

    {var key= 0}
    
    // console.log('THIS IS PROPS', props.tasks)

  return(
        <div>
                <ol>
                    {/* {console.log('THIS IS INSIDE THE RETURN',props.tasks)} */}
                    {props.tasks.map(entry => {
                        return( 
                            <div>
                                <form method="POST" action={`/tasks/${entry._id}?_method=DELETE`}>
                                    <li style={{display: 'inline'}} key={entry._id}> {entry.task} {entry.time}</li>
                                    <button >Delete</button>
                                 </form>
                            </div>
                        )
                    })
                }
                </ol>
        </div>
    )

};

export default Task  

