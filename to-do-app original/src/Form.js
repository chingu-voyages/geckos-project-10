import React, { Component } from 'react';
import Alert from './Alert.js'

export default class Form extends React.Component { //stateless component



handleClick = (event) => {
    // console.log('sample click')
    event.preventDefault();

    console.log('SAMPLE CLICK');
      this.setState({tasks: [this.state.input]});   //referring to line 9
      console.log(this.state.tasks)

}

handleChangeInput = (entry) => {
    // console.log(entry.target.value)
    this.setState({ input: entry });
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

</div>

    )
}

}

