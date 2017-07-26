require('dotenv').config();

let Twilio = require("twilio")
let client = new Twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

class messages{
  send(message, target){
    console.log("test");
    client.messages.create({
      to:target,
      body: message,
      from: process.env.TWILIO_PHONE,
      statusCallback: 'http://chime-in.herokuapp.com/api/messages'
    }).then(res=>{
      console.log("After sending message");

    })
  }
}

module.exports=messages;
