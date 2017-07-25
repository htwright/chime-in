//a bit of Express middleware to handle authentication.

const knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  pool: {
    min:0,
    max:2
  }
});

Auth = (req,res,next) => {
  console.log("Hit auth endpoint.");
  let authDetails = req.get("Authorization").split(" ");
  knex("users").select().where({name: authDetails[0]}).then(result=>{
    //console.log(result);
    if(result.length>0){
      //console.log("user exists!");
      return result;
    }else{
      //console.log("login failed.");
      return null;
    }
  }).then(result=>{
    if(result){
      return knex("tokens").select().where({tokenstring:authDetails[1]})
    }else{
      return null;
    }
  }).then(result=>{
    if(result){
      console.log("logged in successfully.");
      next();
    }else{
      res.send("fail.  Go away.");
    }
  })


}

module.exports=Auth;
