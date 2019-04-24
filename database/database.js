const {accountSid, authToken} = require('../src/config/twilio.js');
const mongoose = require("mongoose");
const moment = require('moment');
const Twilio = require('twilio');


mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/to-do-app-original",  {useNewUrlParser: true}); //creating the database

var nameSchema =  mongoose.Schema({
  task: String,
  number: String, 
  notification: Number,
  time : {type : Date, index : true}
}, {
   versionKey: false
 });



nameSchema.methods.requiresNotification = function(date) {
  const taskDueTime = moment(this.time).tz("America/Los_Angeles").format('LLL');
  const currentTime = moment(date).tz("America/Los_Angeles").format('LLL');
  console.log('*database entry time*\n', taskDueTime);
  console.log('*current time*\n', currentTime);
  console.log('*difference in time\n', Math.round(moment.duration(moment(this.time).tz("America/Los_Angeles").utc().diff(moment(date).tz("America/Los_Angeles").utc())).asMinutes()))
  const minutesBeforeText = 0;
  // Return difference of taskeDueTime and currentTime is equal to minutesBeforeText
  return Math.round(moment.duration(moment(this.time).tz("America/Los_Angeles").utc().diff(moment(date).tz("America/Los_Angeles").utc())).asMinutes()) === minutesBeforeText;
};

nameSchema.statics.sendNotifications = function(callback) {
  // now
  const searchDate = new Date();
  TaskDB
    .find()
    .then(function(tasks) {
      tasks = tasks.filter(function(task) {
              return task.requiresNotification(searchDate);
      });
      if (tasks.length > 0) {
        sendNotifications(tasks);
      }
    });

    function sendNotifications(tasks) {
      const client = new Twilio(accountSid, authToken);
      tasks.forEach(function(task) {
          // Create options to send the message
          const options = {
              to: `+1${task.number}`,
              from: '+15165634928',
              /* eslint-disable max-len */
              body: `${task.task}`,
              /* eslint-enable max-len */
          };
          console.log('THIS IS OPTIONS!', options)

          // Send the message!
          client.messages.create(options, function(err, response) {
              if (err) {
                  // Just log it for now
                  console.error(err);
              } else {
                  // Log the last few digits of a phone number
                  let masked = task.number.substr(0,
                      task.number.length - 5);
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


var TaskDB = mongoose.model("task", nameSchema);
module.exports = TaskDB;