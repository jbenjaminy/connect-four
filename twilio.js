const twilio = require('twilio');
const sid = process.env.sid || require('./twilio/sid') ;
const token = process.env.token || require('./twilio/token');
const client = new twilio.RestClient(sid, token);

let share = (data) => {
  let phoneNumber = data.phoneNumber;
  let accessCode = data.accessCode;
  let recipient = '+1' + phoneNumber;
  let message = 'Join me for a game of connect-four with this access code: ' + accessCode;

  client.messages.create({
      body: message, 
      to: recipient,  
      from: '+18323429579'
  }, function(err) {
      if(err) {
        return console.error(err);
      }
      return('Message sent to ' + phoneNumber);
  });
}

module.exports = share;