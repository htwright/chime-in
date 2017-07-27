//purpose: middleware that runs whenever a message comes in.
const conf = require("../config");
const Messaging = require("./messages");
const fetchUser = require("./fetchUser")
const Message = new Messaging();
const knex = require('./knex')();

MessageReducer = (req,res,next) =>{
  let message = req.body;
  fetchUser(message.From.substring(1)).then(user=>{
    if(message.Body.substring(0,2) === "!!" || user.state=== "manage"){
      console.log("That was an account management message.");
      let command = message.Body.substring(2).toLowerCase();
      console.log("Command is " + command);
      if(command === "skip"){
        //drop the most recent question in your account
        console.log("you should do the skip logic.");
        Message.send("Okay, skipping.", message.From);
      }else if(command ==="help"){
        console.log("show the help logic");
        Message.send("Type !!skip to ignore current question, !!update to update your info, and !!help to get this message.", message.From);
      }

    }else{
      console.log("That was NOT an account management message, bud.");
      next();
    }

  })

}

module.exports=MessageReducer;
