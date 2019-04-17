import React, { Component } from 'react';
import Alert from './Alert.js';
import ReactDOM from "react-dom";
import Button from '@material-ui/core/Button';
// export default class Form extends React.Component { //stateful component

const Form = props => {
    return (
        <div>
        <form method="POST" action="/">
            <input name="task" type="text" onChange = {props.onChange}  placeholder="Type your task" /><br></br>
            <input name="time" type="datetime-local" onChange = {props.time} /> <br></br>
            <input name="number" type="text" onChange = {props.number} placeholder='Type your number'/> 
        {/* <Alert onChange={props.handleChangeInput} />    */}
        <Button onClick={props.onSubmit} variant="contained" color="primary" >Submit</Button>
        </form>
        </div>
        
            )
}

export default Form;

// render(){
    

//     return (
// <div>
// <form>
//     <input name="task" type="text" value={this.props.input} onChange = {this.handleChangeInput}  placeholder="Type your task" /><br></br>
//     {/* how to access 'name' from input tag? */}
    
//     <Alert />    
    
//     <button onClick={this.handleClick} >Submit</button>

// </form>
//  <Task item={this.props.form} />
// </div>

//     )
// }

// }

