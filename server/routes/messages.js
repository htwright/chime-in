require('dotenv').config();

let Twilio = require("twilio")
let client = new Twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);
const mRoutes = require('express').Router();
const bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser);
const Auth = require("../functions/auth");
mRoutes.use("/send",bodyParser.json());
mRoutes.use("/get",bodyParser.json());
mRoutes.use("/post",bodyParser.xml());
mRoutes.use(bodyParser.urlencoded({
  extended: true
}));
mRoutes.use("/send",Auth);
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
mRoutes.get('/', (req, res) => {
  res.status(200).json({ message: 'The raw endpoint.  Maybe try using the actual points?' });
});

mRoutes.post("/send",(req,res,next)=>{
  let arr = JSON.parse(req.body.phone);
  let phone = parseInt(arr[0]);

  console.log(phone);
  client.messages.create({
    to:req.body.phone,
    body: req.body.message,
    from: "+12409863225",
    statusCallback: 'http://chime-in.herokuapp.com/api/messages'
  }).then(msgID => {
    console.log('inside knex write', msgID);
    knex('questions')
      .insert({admin: 1, question: req.body.message, responses: ['hello'], users:req.body.id, msgsid: msgID.sid})
      .catch(err => console.error(err));
    return msgID;
  }).then((msgID)=>{
    // console.log(msgID)
    res.status(200).json({
      message: 'Sent the message "' + req.body.message + '", good job!',
      messageID: msgID.sid
    });
  }).catch((err,msg)=>{
    console.log(err);
  })
});

mRoutes.post('/post', (req, res) => {
  console.log(req.body);
  client.messages(req.body.MessageSid).fetch().then(sms =>{
    console.log("sms is...")
    console.log(sms);
    knex('questions').where('id', 1).update({responses: sms.body});
  }).then(()=> res.status(200).json({message: 'ok'}))
  .catch(err => console.error(err));

});

mRoutes.get("/get/:messageID", (req,res,next)=>{
  client.messages(req.params.messageID).fetch().then(msg=>{
    console.log(msg.body)
    res.status(200).json({message:msg.body});
  })
})

module.exports = mRoutes;
