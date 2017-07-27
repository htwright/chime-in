//purpose: middleware that runs whenever a message comes in.
const conf = require("../config");
const Messaging = require("./messages");
const fetchUser = require("./fetchUser")
const Message = new Messaging();
const knex = require('./knex')();

MessageReducer = (req,res,next) =>{
  let message = req.body.message;
  console.log(req.body);
  fetchUser(message.phone).then(user=>{
    console.log(user);
    // next();
  })

}

module.exports=MessageReducer;
