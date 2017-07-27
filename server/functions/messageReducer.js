//purpose: middleware that runs whenever a message comes in.
const conf = require("../config");
const Messaging = require("./messages");
const Message = new Messaging();
const knex = require('./knex')();

MessageReducer = (req,res,next) =>{
  console.log("hit the message reducer!")
  Message.send(req,1);
  console.log(req);
}

module.exports=Auth;
