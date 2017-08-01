const conf = require("../config");

let Twilio = require("twilio")
let client = new Twilio(conf.TWILIO_SID, conf.TWILIO_AUTH);
let nodemailer = require('nodemailer');
const mRoutes = require('express').Router();
const bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser);
const Auth = require("../functions/auth");
const fetchAdminQuestions = require('../functions/fetchAdminQuestions');
const fetchUserWithPhonenumber = require('../functions/fetchUser');
const fetchUserWithEmail = require('../functions/fetchUser');
const MessageReducer = require("../functions/messageReducer");

mRoutes.use(bodyParser.json());
mRoutes.use(bodyParser.urlencoded({
  extended: true
}));
mRoutes.use("/post",MessageReducer);
//mRoutes.use("/send",Auth);
// mRoutes.use(Auth);
const knex = require('../functions/knex')()

mRoutes.get('/:id', (req, res) => {
  return fetchAdminQuestions(req.params.id).then(j => res.status(200).json(j))
  .catch(err => {
    console.error(err);
    res.status(200).send('No questions found for this admin');
  });
});

mRoutes.post("/send",(req,res,next)=>{
  let arr = JSON.parse(req.body.phone);
  let phone = parseInt(arr[0]);

  //console.log(phone);
  client.messages.create({
    to:req.body.phone,
    body: req.body.message,
    from: conf.TWILIO_PHONE,
    statusCallback: `${conf.URL}/api/messages`
  }).then(msgID => {
    //console.log('inside knex write', msgID);
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

let secret = require('../secret');

mRoutes.post('/sendEmail', (req, res) => {

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: 'thieniscoding@gmail.com',
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: '1/XXxXxsss-xxxXXXXXxXxx0XXXxxXXx0x00xxx',
      accessToken: 'ya29.Xx_XX0xxxxx-xX0X0XxXXxXxXXXxX0x',
      expires: 1484314697598
    }
  })

  transporter.set('oauth2_provision_cb', (user, renew, callback)=>{
      let accessToken = userTokens[user];
      if(!accessToken){
          return callback(new Error('Unknown user'));
      }else{
          return callback(null, accessToken);
      }
  })

  let mailOpts = {
    to: req.body.email,
    body: req.body.message,
    from: req.body.from
  }

  transporter.sendMail(mailOpts, (error, res) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Message sent' + res.response);
      res.status(200).json({ message: 'Sent the message ' + res.response });
    }
    transporter.close();
  })

})


mRoutes.post('/post', (req, res) => {
  console.log(req.body);
  return fetchUserWithPhonenumber(req.body.From.substring(1)).then(data => {
    console.log(data[0]);
    return knex('questions').update({responses: JSON.stringify(req.body.Body)}).where('users', data[0].id);
  }).then (()=> res.status(200).send('ok'))
    .catch(err => console.error(err));
});

mRoutes.get("/get/:messageID", (req,res,next)=>{
  client.messages(req.params.messageID).fetch().then(msg=>{
    console.log(msg.body)
    res.status(200).json({message:msg.body});
  })
})

module.exports = mRoutes;
