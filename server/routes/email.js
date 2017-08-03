const {
    GMAIL_SERVICE, GMAIL_AUTH_TYPE, GMAIL_AUTH_USER, GMAIL_AUTH_CLIENT_ID, GMAIL_AUTH_CLIENT_SECRET,
    GMAIL_AUTH_REFRESH_TOKEN, GMAIL_AUTH_ACCESS_TOKEN, GMAIL_FROM_EMAIL, GMAIL_SUPPORT_EMAIL
} = process.env;

const mailin = require('mailin');
// One of silly, info, debug, warn, error

options = {
    port: 25,
    webhook: 'http://f44239bd.ngrok.io',
    disableWebhook: false,
    logFile: '/some/local/path',
    logLevel: 'warn',
    smtpOptions: '{ // Set of options directly passed to simplesmtp.createServer(smtpOptions)
    SMTPBanner: 'Hi from a custom Mailin instance'
  }
};

mailin.start({
  port: 25,
  disableWebhook: true // Disable the webhook posting.
});
"user": GMAIL_AUTH_USER,
/* Access simplesmtp server instance. */
from: GMAIL_AUTH_USER
mailin.on('authorizeUser', function(connection, username, password, done) {
  if (username == "johnsmith" && password == "mysecret") {
    done(null, true);
  } else {
    done(new Error("Unauthorized!"), false);
  }
});

/* Event emitted when a connection with the Mailin smtp server is initiated. */
mailin.on('startMessage', function (connection) {
  connection = {
      from: 'sender@somedomain.com',
      to: 'someaddress@yourdomain.com',
      id: 't84h5ugf',
      authentication: { username: null, authenticated: false, status: 'NORMAL' }
  }
  };
  console.log(connection);
});

/* Event emitted after a message was received and parsed. */
mailin.on('message', function (connection, data, content) {
  console.log(data);
  /* Do something useful with the parsed message here.
   * Use parsed message `data` directly or use raw message `content`. */
});
