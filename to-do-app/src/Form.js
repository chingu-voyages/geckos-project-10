import React, { Component } from 'react';
import Alert from './Alert.js'

export default class Form extends React.Component {

render(){

    return (
<div>
<form>
    <input name="task" type="text" placeholder="Type your task" /><br></br>
    <Alert />    
    
    <input type="submit" />

</form>

</div>

    )


}





}