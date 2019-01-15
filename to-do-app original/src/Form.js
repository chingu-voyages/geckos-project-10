import React, { Component } from 'react';
import Alert from './Alert.js'
import Task from './Task.js';

export default class Form extends React.Component { //stateless component



handleClick = (event) => {
    // console.log('sample click')
    event.preventDefault();
      console.log(this.state.task)

}

handleChangeInput = (entry) => {
    const userInput = entry.target.value;
    this.setState({ task: userInput });
    return userInput;
}

render(){
    

    return (
<div>
<form>
    <input name="task" type="text" value={this.props.input} onChange = {this.handleChangeInput}  placeholder="Type your task" /><br></br>
    {/* how to access 'name' from input tag? */}
    
    <Alert />    
    
    <button onClick={this.handleClick} >Submit</button>

</form>
 <Task item={this.props.form} />
</div>

    )
}

}

