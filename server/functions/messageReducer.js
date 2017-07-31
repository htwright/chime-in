//purpose: middleware that runs whenever a message comes in.
const conf = require("../config");
const Messaging = require("./messages");
const fetchUser = require("./fetchUser")
const updateUser = require("./updateUser");
const getUserCurrentQuestion = require("./getUserCurrentquestion");
const findVerifyStatus = require("./verification/findVerifyStatus");
const createVerifyStatus = require("./verification/createVerifyStatus");
const updateVerifyStatus = require("./verification/updateVerifyStatus");
const Message = new Messaging();
const knex = require('./knex')();

MessageReducer = (req,res,next) =>{
  let message = req.body;
  //console.log("phone number is.............")
  //console.log(message.From);

  fetchUser(message.From.substring(1)).then(user=>{
    //check if there is a verify token for the user
    //to do so, check who sent the last question, then check the verify table
    //findVerifyStatus(user.id,).then()
    user = user[0];
    getUserCurrentQuestion(user.id).then(currentQuestion=>{
      //now we fetch verify status with the returned question's id
      findVerifyStatus(user.id,currentQuestion[0].admin).then(result=>{
        console.log("result is.........................................");
        console.log(result);
        //now do stuff depending on whether the user verified that admin.

        if (result !== null){
          //cast result into array if it isn't one
          if(!Array.isArray(result)) result = [result]

          if(result[0].status === "verified"){
            //do stuff
            if(message.Body.substring(0,2) === "!!" || user.state=== "manage"){
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
              }else if(command === "revoke"){
                Message.send("Okay, revoking.  If you wish to reenable, please send reenable.  Site creator: make sure to let the user retarget this admin later.  Maybe a view revoked.", message.From);
                createVerifyStatus(user.id,currentQuestion[0].admin,"revoked");
              }
            }
            else{
              console.log("That was NOT an account management message, bud.");
              next();
            }
          }else{
            //check if the user sent reenable
            if(message.Body === "reenable"){
              //update verification status with the function
              updateVerifyStatus(user.id,currentQuestion[0].admin);
              Message.send("Got it, they can send you questions again.  Type !!current to get your current question.",message.From);
            }else{
              Message.send("You aren't verified with this person!  Send reenable to let them send you questions.",message.From);
            }
          }
        }else{
          console.log("not verified, doing the checks for that.")
          //this fires if there is not verified status.  Create verified status based on what the person sent.
          console.log("user is..........................")
          console.log(user)
          console.log("currentQuestion is..........................")
          console.log(currentQuestion)
          if(message.Body.toLowerCase() === "yes"){
            //user is verified, reply and then create auth token.
            Message.send("Awesome, you are verified!  Here's your question:",message.From);
            Message.send(currentQuestion[0].question,message.From,1000);
            createVerifyStatus(user.id,currentQuestion[0].admin);
          }else if(message.Body.toLowerCase() === "no"){
            Message.send("Okay, that person has been blocked from sending you questions.  Reply with reenable if you did this in error.",message.From);
            createVerifyStatus(user.id,currentQuestion[0].admin,"revoked");
          }else{
            Message.send("I'm sorry, I didn't understand that.  Please send yes if you want to allow the sender to send you messages, or no if not.",message.From);
          }
        }

      })
    })
  })

}

module.exports=MessageReducer;
