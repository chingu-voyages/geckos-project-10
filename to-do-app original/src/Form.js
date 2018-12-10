import React, { Component } from 'react';
import Alert from './Alert.js'

export default class Form extends React.Component {

handleClick(event){
    console.log('sample click')
    event.preventDefault();
}

render(){
    

    return (
<div>
<form>
    <input name="task" type="text"  placeholder="Type your task" /><br></br>
    <Alert />    
    
    <button onClick={this.handleClick} >Submit</button>

</form>

</div>

    )


}





}