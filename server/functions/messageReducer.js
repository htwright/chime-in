//purpose: middleware that runs whenever a message comes in.

const knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  pool: {
    min:0,
    max:2
  }
});

MessageReducer = (req,res,next) =>{
  console.log(req);
}

module.exports=Auth;
