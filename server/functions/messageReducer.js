//purpose: middleware that runs whenever a message comes in.
const conf = require("../config");

const knex = require('./knex')();

MessageReducer = (req,res,next) =>{
  console.log(req);
}

module.exports=Auth;
