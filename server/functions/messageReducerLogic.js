const Messaging = require("./messages");
const Message = new Messaging();
const getUserCurrentQuestion = require("./getUserCurrentquestion");
const findVerifyStatus = require("./verification/findVerifyStatus");
const createVerifyStatus = require("./verification/createVerifyStatus");
const updateVerifyStatus = require("./verification/updateVerifyStatus");
const fetchUser = require("./fetchUser")
const updateUser = require("./updateUser");

const messageReducerLogic = (message, user, currentQuestion=null) =>{
  if(message.Body.substring(0,2) === "!!" || user.state=== "manage"){
    //This is the message reducer.
    let command = message.Body.substring(2).toLowerCase();
    console.log("Command is " + command);
    if(command === "skip"){
      //drop the most recent question in your account
      console.log("you should do the skip logic.");
      Message.send("Okay, moving that question to the end.", message.From);
    }else if(command ==="help"){
      console.log("show the help logic");
      Message.send("Type !!skip to skip current question, !!revoke to revoke current sender's right to send you messages, and !!help to get this message.", message.From);
    }else if(command === "revoke"){
      if(currentQuestion){
        Message.send("Okay, revoking.  If you wish to reenable, please send reenable.  Site creator: make sure to let the user retarget this admin later.  Maybe a view revoked.", message.From);
        createVerifyStatus(user.id,currentQuestion.admin,"revoked");
      }else{
        Message.send("You have no active question.  I can't revoke something that doesn't exist.", message.From);
      }

    }
  }
  else{
    console.log("That was NOT an account management message, bud.");
    next();
  }
}

module.exports=messageReducerLogic;
