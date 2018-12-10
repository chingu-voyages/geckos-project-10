import React, { Component } from 'react';

export default class Alert extends React.Component {

    render(){
        return(
            <div>
                <form>
                    <input name="alert-time" type="time" /> 
                </form>
            </div>
        )
    }
}