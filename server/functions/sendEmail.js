let nodemailer                  = require( 'nodemailer' );
const {
		    GMAIL_SERVICE, GMAIL_AUTH_TYPE, GMAIL_AUTH_USER, GMAIL_AUTH_CLIENT_ID, GMAIL_AUTH_CLIENT_SECRET,
		    GMAIL_AUTH_REFRESH_TOKEN, GMAIL_AUTH_ACCESS_TOKEN
} = process.env;

const sendEmail = (to, text, subject="Let's Get Simmetric!") => {

  let auth = {
      "type": GMAIL_AUTH_TYPE,
      "user": GMAIL_AUTH_USER,
      "clientId": GMAIL_AUTH_CLIENT_ID,
      "clientSecret": GMAIL_AUTH_CLIENT_SECRET,
      "refreshToken": GMAIL_AUTH_REFRESH_TOKEN,
      "accessToken": GMAIL_AUTH_ACCESS_TOKEN
  };

  const transporter = nodemailer.createTransport({
      service: GMAIL_SERVICE,
      auth
  });

  let mailOpts = {
    to: to,
    text: text,
    from: GMAIL_AUTH_USER,
    subject: subject
  }

  transporter.sendMail(mailOpts, (error, res) => {
    if (error) {
      console.log(error);
    } else {
      res.status(200).json({ message: 'Sent the message ' + res.response });
    }
    transporter.close();
  })
}

module.exports=sendEmail;
