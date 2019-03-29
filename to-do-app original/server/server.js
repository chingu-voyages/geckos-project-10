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
const methodOverride = require('method-override');
const http = require('http');
// const accountSid = 'AC019a30196451142d27d879a8f687f3cc';
// const authToken = '978f64b17f1149a06b5f1a84c6fe1bf4';
const client = require('twilio')(accountSid, authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;
import {accountSid, authToken} from '../src/config/twilio.js';



app.use(methodOverride('_method'));


mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/to-do-app-original",  {useNewUrlParser: true}); //creating the database

var nameSchema =  mongoose.Schema({
  task: String,
  number: String, 
  time : String
}, {
   versionKey: false
 });

 var TaskDB = mongoose.model("task", nameSchema);

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 


app.get('/', function (req, res) {  //grabs from DB
  // console.log('this is a GET request')
  let tasks;
  
  // TaskDB.find({}).exec((err, data) =>{ 
  //   if (err) console.log(err);
  //     tasks = data;
  //     // console.log("THIS IS TASKS",tasks);
  //     const taskString = renderToString(<Task todoTasks={tasks} />);
  // })

  TaskDB.find({}).exec().then((data) =>{ 
      tasks = data;
      // console.log("THIS IS TASKS",tasks);
  }).then(() => {
    const appString = renderToString(<App tasks={tasks} />);
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
  }).catch(err => {
    console.log(err, 'THIS IS A GET PROMISE ERROR')
  })

  
  // const appString = renderToString(<App />);
  // console.log('THIS IS APPSTRING', appString)

  // const indexFile = path.resolve('../to-do-app original/public/index.html');
  // fs.readFile(indexFile, 'utf8', (err, data) => {
  //   if (err) {
  //     console.error('Something went wrong:', err);
  //     return res.status(500).send('Oops, better luck next time!');
  //   }
  //   return res.send(
  //     data.replace('<div id="root"></div>', `<div id="root">${appString}</div>`)
  //   );  
  // });
  // res.sendFile(path.join(__dirname, '/../public', 'index.html'));

  // res.send(index({
  //   body: appString,
  //   title: 'Hello World from the server',
  // }))
});

app.post('/', function(req, res){ //database endpoint; submits data from user input
  let tasks;
  // console.log(req.body, "*******")
  TaskDB.create(req.body, (err, result) => {
    if(err){
      console.log('ERROR IN CREATE ', err)
    }
    console.log('CREATE SUCCESS ',result)
    TaskDB.find({}).exec()
  .then((data) =>{ 
      // console.log(data)
      tasks = data;
      console.log('THIS IS TASKS', tasks)
     })
    .then(() => {
      const appString = renderToString(<App tasks={tasks} />);
      const indexFile = path.resolve('../to-do-app original/public/index.html');
      fs.readFile(indexFile, 'utf8', (err, data) => {
        if (err) {
          console.error('Something went wrong:', err);
          return res.status(500).send('Oops, better luck next time!');
        }
        return res.send(
          data.replace('<div id="root"></div>', `<div id="root">${appString}</div>`)
        );  
      })
      const phoneNumber = tasks[tasks.length-1].number;
      const inputTime = tasks[tasks.length-1].time;
      const currentTimeString = `${new Date().getHours().toString()}:${new Date().getMinutes() < 10 ? '0' + new Date.getMinutes().toString() : new Date().getMinutes().toString()}`
      // console.log((new Date().getMinutes() < 10 ? '0':'') + date.getMinutes());
      console.log('CURRENTTIMESTRING', currentTimeString);

      if(inputTime === currentTimeString ){
      client.messages
        .create({
          body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
          from: '+15165634928',
          to: '+1' + phoneNumber
        })
    .then(message => console.log(message.sid))}

    }).catch(err => {
      console.log(err, 'THIS IS A POST PROMISE ERROR')
      
    })
  })
})

app.delete('/tasks/:id', function (req, res) {
  console.log('DELETE REQUEST WORKING')
  console.log(req.params)
  let tasks;
  TaskDB.findByIdAndRemove({_id:req.params.id}, function(err,data)
  {
      if(err){
          console.log("DELETE REQUEST ERROR");
      }
      console.log('SUCCESSFULLY DELETED FINALLY ')
      TaskDB.find({}).exec()
      .then((data) =>{ 
        console.log(data)
        tasks = data; })
      .then(() => {
        const appString = renderToString(<App tasks={tasks} />);
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
      }).catch(err => {
        console.log(err, 'THIS IS A DELETE PROMISE ERROR')
      })
  });
});

app.post('/sms', (req, res) => {
  // console.log('REQ.PARAMS HERE', req.params)
  // console.log('Twilio post request working')
  // const twiml = new MessagingResponse();

  // client.messages
  // .create({
  //    body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
  //    from: '+15165634928',
  //    to: '+4159944797'
  //  })
  // .then(message => console.log(message.sid));

  // twiml.message('The Robots are coming! Head for the hills!');

  // res.writeHead(200, {'Content-Type': 'text/xml'});
  // res.end(twiml.toString());

});

app.listen(8080);
console.log('Node server running on port 8080');  
