
const accountSid = 'AC019a30196451142d27d879a8f687f3cc';
const authToken = '978f64b17f1149a06b5f1a84c6fe1bf4';
const client = require('twilio')(accountSid, authToken);


client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+15165634928',
     to: '+4159944797'
   })
  .then(message => console.log(message.sid));