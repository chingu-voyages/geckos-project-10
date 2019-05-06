const mongoose = require("mongoose");
const moment = require('moment');
const Twilio = require('twilio');
// const accountSid = 'AC019a30196451142d27d879a8f687f3cc';
// const authToken = '978f64b17f1149a06b5f1a84c6fe1bf4';
const accountSid = process.env.TWILIO_SID || 'AC019a30196451142d27d879a8f687f3cc',
      authToken = process.env.TWILIO_AUTHTOKEN || '978f64b17f1149a06b5f1a84c6fe1bf4',
      mongoPW = process.env.MONGO_PW;

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/to-do-app-original",  {useNewUrlParser: true}); //creating the database
// mongoose.connect(`mongodb+srv://sjl:${mongoPW}@ssr-todo-app-jvm4p.mongodb.net/ssr-todo-app`, {useNewUrlParser: true});

var nameSchema =  mongoose.Schema({
  task: String,
  number: String, 
  notification: Number,
  currentTime: String,
  time : {type : Date, index : true}
  },
  {
   versionKey: false
 });

//  console.log('MOMENT\n',moment(this.time))
//  console.log(moment(this.time).tz("America/Los_Angeles"))
//  console.log('MOMENT END\n',moment(this.time).tz("America/Los_Angeles")).utc();


nameSchema.methods.requiresNotification = function(date) {
  // NOT USED IN CODE.ONLY FOR CONSOLE LOG REFERENCE
  const taskDueTime = moment(this.time).tz("America/Los_Angeles").format('LLL');
  const pacificTime = "Los_Angeles";
  const currentTime = moment(date).tz("America/Los_Angeles").format('LLL');
  console.log('*database entry time*\n', taskDueTime);
  console.log('*current time*\n', currentTime);
  // console.log('*difference in time\n', Math.round(moment.duration(moment(this.time).tz("America/Los_Angeles").utc().diff(moment(date).tz("America/Los_Angeles").utc())).asMinutes()))
  
  console.log('*difference in time\n', Math.round(moment.duration(moment(this.time).utc().diff(moment(date).utc())).asMinutes()))
  const minutesBeforeText = 0;
  // Return difference of taskeDueTime and currentTime is equal to minutesBeforeText
  // return Math.round(moment.duration(moment(this.time).tz("America/Los_Angeles").utc().diff(moment(date).tz("America/Los_Angeles").utc())).asMinutes()) === minutesBeforeText;
  return Math.round(moment.duration(moment(this.time).diff(moment(date))).asMinutes()) === minutesBeforeText;
};

nameSchema.statics.sendNotifications = function(callback) {
  // now
  const searchDate = new Date(); //utc on heroku unless we specify timezone on heroku via TZ = timezone Config Variable
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