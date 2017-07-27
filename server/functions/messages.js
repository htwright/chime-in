const conf = require("../config");
let Twilio = require("twilio")
let client = new Twilio(conf.TWILIO_SID, conf.TWILIO_AUTH);

class messages{
  send(message, target){
    console.log("test");
    client.messages.create({
      to:target,
      body: message,
      from: conf.TWILIO_PHONE,
      statusCallback: conf.URL +'/api/messages'
    }).then(res=>{
      console.log("After sending message");

    })
  }
}

module.exports=messages;
