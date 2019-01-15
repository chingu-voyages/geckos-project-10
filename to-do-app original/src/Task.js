import React, {Component} from 'react';
import Form from './Form.js';

const Task = props => {

  return(
        <div>
            <ol>
                { console.log()}
                    props.tasks.map(entry => {
                     
                            <li>Sample Text goes here</li>
                    
                    })
                }
            </ol>
        </div>
    )

};

export default Task  

