//purpose: middleware that runs whenever a message comes in.
const conf = require("../config");
const Messaging = require("./messages");
const fetchUser = require("./fetchUser")
const Message = new Messaging();
const knex = require('./knex')();

MessageReducer = (req,res,next) =>{
  let message = req.body;
  console.log("phone number is.............")
  console.log(message.From);

  fetchUser(message.From.substring(1)).then(user=>{
    //User is user, From is phone number, Body is the message.
    if(user.state==="verify"){
      //verify the user.  Check if it is yes
        if(message.Body === "yes"){
          Message.send("Awesome, you are verified!  We'll send you the message now.", message.From);
          //Fetch current question
        }
    }
    else if(message.Body.substring(0,2) === "!!" || user.state=== "manage"){
      //This is the message reducer.
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

    }



    else{
      console.log("That was NOT an account management message, bud.");
      next();
    }

  })

}

module.exports=MessageReducer;
