const CronJob = require('cron').CronJob;
const notificationWorkerFactory = require('./notificationsWorker');
const moment = require('moment');

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

  module.exports = schedulerFactory();