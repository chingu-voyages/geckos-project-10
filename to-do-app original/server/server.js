import React from 'react';
import App from '../src/App.js';
import { renderToString } from 'react-dom/server';
import fs from 'fs';
import Task from '../src/Task.js';
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const mongoose = require("mongoose");
// app.use(express.static(path.join(__dirname, '/../public')));


mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/to-do-app-original",  {useNewUrlParser: true}); //creating the database

var nameSchema =  mongoose.Schema({
  task: String,
  time: String 
 }, {
   versionKey: false
 });

 var TaskDB = mongoose.model("task", nameSchema);




app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 


app.get('/', function (req, res) {
  console.log('this is a GET request')
  let tasks;
  TaskDB.find({}).exec((err, data) =>{ 
    if (err) console.log(err);
      tasks = data;
      // console.log("THIS IS TASKS",tasks);
      // const taskString = renderToString(<Task todoTasks={tasks} />);
  })
 
  const appString = renderToString(<App />);
  // console.log('THIS IS APPSTRING', appString)

  const indexFile = path.resolve('../to-do-app original/public/index.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }
    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${appString}</div>`)
    );  
  });
  // res.sendFile(path.join(__dirname, '/../public', 'index.html'));

  // res.send(index({
  //   body: appString,
  //   title: 'Hello World from the server',
  // }))
});

app.post('/', function(req, res){ //database endpoint
  console.log(req.body, "*******")
  TaskDB.create(req.body, (err,res)=>{
    if(err){
      console.log(err)
    } 
    // console.log(res)
  })
  // .then(item => {
  // res.send("item saved to database");
  // })
  // .catch(err => {
  // res.status(400).send("unable to save to database");
  // });
})


 app.get ('/tasks', function(req, res){ //sending to wherever /tasks route is listed
  console.log('this is the OTHER GET request')
 TaskDB.find({}, function(err, tasks){
      if(err){
        console.log(err);
      } else {
        console.log(tasks);
         res.send(tasks);
      }    
    })
})




app.listen(8080);
console.log('Node server running on port 8080');  

// export default todosData;
