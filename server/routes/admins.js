require('dotenv').config();
let Twilio = require("twilio");

let Tokens = require("../functions/tokens");
let Messages = require("../functions/messages");

let client = new Twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);
const aRoutes = require('express').Router();
const bodyParser = require('body-parser');
aRoutes.use(bodyParser.json());
aRoutes.use(bodyParser.urlencoded({
  extended: true
}));
let url = 'http://localhost:8080';
if (process.env.NODE_ENV === 'production'){
  url = 'http://chime-in.herokuapp.com';
}
const knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  pool: {
    min:0,
    max:2
  }
});

aRoutes.post("/login", (req,res, next)=>{
  let redirect = () => {
    res.status(409)
      .redirect(307,"./gettoken");
  }
  if(req.body.token && req.body.name){
    console.log("everything exists you need.");
    knex("users").select().where({name: req.body.name}).then(result=>{
      //check that username exists.  If not, redirect to the new token place.
      if(result.length==0){
        redirect();
      }else{
        return result[0];
      }
    }).then(result=>{
      //check if code matches what you were Sent
      let id = result.id
      knex("tokens").select("tokenstring").where({userid: id,type: "verify"}).then(result=>{
        let token = result[0].tokenstring;
        console.log("result token: " +token)
        console.log("token: " + req.body.token)
        if(token === req.body.token){
          //the code matches the token you were sent, so generate an actual token.
          console.log("yup, generate a real token and flush the verify token.");
          let Token = new Tokens();
          let authToken = Token.makeToken();
          knex("tokens").insert({userid: id,tokenstring: authToken,type: "auth"}).then(result=>{
            res.status(200).json({token:authToken});
          })
        }else{
          console.log("nope.");
          redirect();
        }
      })
    })
  }else{
    //someone just tried to login but failed, so dump all active tokens
    redirect();
  }

})

aRoutes.post("/gettoken", (req,res,next)=>{
  let userID;
  //log into your user
  knex("users").select().where({type:"admin",name: req.body.name}).then(searchResult=>{
    if(searchResult.length>0){
      let TokenManager = new Tokens();
      let verification = TokenManager.makeVerificationCode();
      let MessageManager = new Messages();
      userID = searchResult[0].id;
      //dump all existing tokens
      knex("tokens").where({userid: userID}).delete().then(thingie=>{
        MessageManager.send(`Your code is ${verification}`, "+15408459811");
        //console.log(`userID: ${searchResult[0].id}`);
        knex("tokens").insert({userid: userID,tokenstring: verification}).then(res=>console.log(res));
      });

    }else{
      userID = (Math.random()*1000).toFixed(0);
    }
    res.status(200).json({body: "If user exists, you should get a text message soon.",userID: userID})
    })
})






module.exports = aRoutes;
