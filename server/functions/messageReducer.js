//purpose: middleware that runs whenever a message comes in.
const conf = require("../config");

const knex = require('knex')({
  client: 'pg',
  connection: conf.DATABASE_URL,
  pool: {
    min:0,
    max:2
  }
});

MessageReducer = (req,res,next) =>{
  console.log(req);
}

module.exports=Auth;
