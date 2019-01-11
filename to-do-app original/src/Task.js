import React, {Component} from 'react';


const Task = props => {

    return(
        <div>
            <ol>
                { console.log(props)
                    props.tasks.map(entry => {
                        return(
                            <li>{entry}</li>
                        )
                    })
                }
            </ol>
        </div>
    )

};

// export default class Task extends React.Component {

   
//     render(){

//         return(

//         )
//     }
// }