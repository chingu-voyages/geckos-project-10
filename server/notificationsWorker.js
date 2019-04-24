const TaskDB = require('../database/database.js')

const notificationWorkerFactory = function() {
    return {
      run: function() {
        TaskDB.sendNotifications();
      },
    };
  };

  module.exports = notificationWorkerFactory();