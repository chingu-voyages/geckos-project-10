import React from 'react';
import App from '../src/App.js';
import { renderToString } from 'react-dom/server';
import fs from 'fs';
import Task from '../src/Task.js';
import {accountSid, authToken} from '../src/config/twilio.js';
const client = require('twilio')(accountSid, authToken);
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const mongoose = require("mongoose");
const methodOverride = require('method-override');
const http = require('http');
const CronJob = require('cron').CronJob;
// const notificationsWorker = require('./workers/notificationsWorker')
const moment = require('moment');
const Twilio = require('twilio');
// const accountSid = 'AC019a30196451142d27d879a8f687f3cc';
// const authToken = '978f64b17f1149a06b5f1a84c6fe1bf4';
// const MessagingResponse = require('twilio').twiml.MessagingResponse;



app.use(methodOverride('_method'));


mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/to-do-app-original",  {useNewUrlParser: true}); //creating the database

var nameSchema =  mongoose.Schema({
  task: String,
  number: String, 
  time : {type : Date, index : true}
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

  TaskDB.find({}).exec().then((data) =>{ 
      tasks = data;
      // console.log("THIS IS TASKS********",tasks);
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
      console.log('THIS IS DATA*******', data)
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
      // const inputTime = tasks[tasks.length-1].time;
      client.messages
        .create({
          body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
          from: '+15165634928',
          to: ` +1 ${phoneNumber}`
        })
    .then(message => console.log("THIS IS MESSAGE.SID", message.sid))
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

const notificationWorkerFactory = function() {
  return {
    run: function() {
      TaskDB.sendNotifications();
    },
  };
};


const schedulerFactory = function() {
  return {
    start: function() {
      new CronJob('00 * * * * *', function() {
        console.log('Running Send Notifications Worker for ' +
          moment().format());
        notificationWorkerFactory.run();
      }, null, true, '');
    },
  };
};

// const notificationWorkerFactory = function() {
//   return {
//     run: function() {
//       TaskDB.sendNotifications();
//     },
//   };
// };

nameSchema.methods.requiresNotification = function(date) {
  return Math.round(moment.duration(moment(this.time).tz(this.timeZone).utc()
                          .diff(moment(date).utc())
                        ).asMinutes()) === this.notification;
};

nameSchema.statics.sendNotifications = function(callback) {
  // now
  const searchDate = new Date();
  Task
    .find()
    .then(function(tasks) {
      tasks = tasks.filter(function(task) {
              return task.requiresNotification(searchDate);
      });
      if (tasks.length > 0) {
        sendNotifications(tasks);
      }
    });


    function sendNotifications(appointments) {
      const client = new Twilio(cfg.twilioAccountSid, cfg.twilioAuthToken);
      appointments.forEach(function(appointment) {
          // Create options to send the message
          const options = {
              to: `+ ${appointment.phoneNumber}`,
              from: cfg.twilioPhoneNumber,
              /* eslint-disable max-len */
              body: `Hi ${appointment.name}. Just a reminder that you have an appointment coming up.`,
              /* eslint-enable max-len */
          };

          // Send the message!
          client.messages.create(options, function(err, response) {
              if (err) {
                  // Just log it for now
                  console.error(err);
              } else {
                  // Log the last few digits of a phone number
                  let masked = appointment.phoneNumber.substr(0,
                      appointment.phoneNumber.length - 5);
                  masked += '*****';
                  console.log(`Message sent to ${masked}`);
              }
          });
      });

      // Don't wait on success/failure, just indicate all messages have been
      // queued for delivery
      if (callback) {
        callback.call();
      }
  }
};

// module.exports = schedulerFactory();
// module.exports = notificationWorkerFactory();

app.listen(8080);
console.log('Node server running on port 8080');  
