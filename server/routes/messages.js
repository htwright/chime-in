require('dotenv').config();
let Twilio = require("twilio")
let client = new Twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);
const mRoutes = require('express').Router();
const bodyParser = require('body-parser');
mRoutes.use(bodyParser.json());
mRoutes.use(bodyParser.urlencoded({
  extended: true
}));

mRoutes.get('/', (req, res) => {
  res.status(200).json({ message: 'The raw endpoint.  Maybe try using the actual points?' });
});

mRoutes.post("/send",(req,res,next)=>{

  client.messages.create({
    to:req.body.phone,
    body: req.body.message,
    from: "+12409863225",
    statusCallback: "http://chime-in.herokuapp.com/messages"
  }).then((msgID)=>{
    console.log(msgID)
    res.status(200).json({
      message: 'Sent the message "' + req.body.message + '", good job!',
      messageID: msgID.sid
    });
  }).catch((err,msg)=>{
    console.log(err);
  })
});

mRoutes.get("/get/:messageID", (req,res,next)=>{
  client.messages(req.params.messageID).fetch().then(msg=>{
    console.log(msg.body)
    res.status(200).json({message:msg.body});
  })
})

module.exports = mRoutes;
