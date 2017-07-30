const conf = require("../config");
let Twilio = require("twilio")
let client = new Twilio(conf.TWILIO_SID, conf.TWILIO_AUTH);

class messages{
  constructor(userId){
    if(userId) this.userId = userId;
  }
  send(message, target){
    console.log(target);
    client.messages.create({
      to:target,
      body: message,
      from: conf.TWILIO_PHONE,
    }).then(res=>{
      console.log("After sending message");
      console.log(res);

    })
  }
  SendCurrentQuestion(id=this.userId){
    //get the current question from the user's list.

  }
}

module.exports=messages;
