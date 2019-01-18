import React, {Component} from 'react';

const Task = props => {

  return(
        <div>
            <ol>
                    {props.tasks.map(entry => {
                        return(
                            <div>
                            {/* NOT SET UP PROPERLY YET */}
                            <li>{entry.name}</li> 
                            <li> {entry.time}</li>      
                            {/* NOT SET UP PROPERLY YET */}
                            </div>
                        )
                    })
                }
            </ol>
        </div>
    )

};

export default Task  

