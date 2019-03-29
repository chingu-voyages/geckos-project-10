import {accountSid, authToken} from 'src/config/twilio.js';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+15165634928',
     to: userNum
   })
  .then(message => console.log(message.sid));