const mRoutes                   = require( 'express' ).Router( );
const bodyParser                = require( 'body-parser' );
const conf                      = require( "../config" );
const Auth                      = require( "../functions/auth" );
const addQuestionToUser = require('../functions/addQuestionToUser');
const fetchAdminQuestions       = require( '../functions/fetchAdminQuestions' );
const fetchUserWithPhonenumber  = require( '../functions/fetchUser' );
const fetchUserWithEmail        = require('../functions/fetchUser');
const addQuestionResponse       = require( '../functions/addQuestionResponse' );
const getUserCurrentQuestion    = require( '../functions/getUserCurrentQuestion' );
const removeQuestionFromUser		= require( '../functions/removeQuestionFromUser');
const Messaging                 = require( '../functions/messages' );
const MessageReducer            = require( "../functions/messageReducer" );
let Twilio                      = require( "twilio" )
let nodemailer                  = require('nodemailer');
let client                      = new Twilio( conf.TWILIO_SID, conf.TWILIO_AUTH );
                                  require( 'body-parser-xml' )( bodyParser );

mRoutes.use(bodyParser.json( ));
mRoutes.use(bodyParser.urlencoded({ extended: true }));
mRoutes.use( "/post", MessageReducer );

//to use two-factor, use Auth on endpoint.
//mRoutes.use("/send",Auth);
// mRoutes.use(Auth);

const knex = require( '../functions/knex' )( )

mRoutes.get('/:id', ( req, res ) => {
	return fetchAdminQuestions( req.params.id )
		.then(j => res.status( 200 ).json( j ))
		.catch(err => {
			console.error( err );
			res
				.status( 200 )
				.send( 'No questions found for this admin' );
		});
});

mRoutes.post("/send", ( req, res, next ) => {
	// let arr = JSON.parse( req.body.data.phone );
	// let phone = parseInt(arr[0]);
	//console.log(phone);
	let idAccumulator = [];
	req.body.data.forEach(obj => {
		idAccumulator.push(obj.id);
	return client
		.messages
		.create({ to:obj.phonenumber, body:req.body.message, from: conf.TWILIO_PHONE})
		});
		// Promise.all(promiseArr)
		// .then(() => {
			//console.log('inside knex write', msgID);
			return knex( 'questions' ).insert({
				admin: 1,
				question: req.body.message,
				responses: JSON.stringify({ }),
				users: req.body.targets
		}).returning('id')
		.then(questionId => {
			idAccumulator.forEach(id => addQuestionToUser(id, questionId));
			// console.log(msgID)
			res
				.status( 200 )
				.json({
					message: 'Sent the message "' + req.body.message + '", good job!'
				});
		})
		.catch(( err, msg ) => {
			console.log( err );
		})
});

const {
    GMAIL_SERVICE, GMAIL_AUTH_TYPE, GMAIL_AUTH_USER, GMAIL_AUTH_CLIENT_ID, GMAIL_AUTH_CLIENT_SECRET,
    GMAIL_AUTH_REFRESH_TOKEN, GMAIL_AUTH_ACCESS_TOKEN, GMAIL_FROM_EMAIL, GMAIL_SUPPORT_EMAIL
} = process.env;

mRoutes.post('/sendEmail', (req, res) => {

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
    to: req.body.email,
    body: req.body.message,
    from: req.body.from
  }
  console.log('is there a message', req.body.message);
  // transporter.sendMail(mailOpts, (error, res) => {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log('Message sent' + res.response);
  //     res.status(200).json({ message: 'Sent the message ' + res.response });
  //   }
  //   transporter.close();
  // })

  transporter.sendMail({
    to: req.body.email,
    text: req.body.message,
    from: req.body.from,
    subject: 'Chime in!'
  }, (error, res) => {

    if (error) {
      console.log(error);
    } else {
      console.log('Message sent' + res.response);
      res.status(200).json({ message: 'Sent the message ' + res.response });
    }
    // transporter.close();
})
})

mRoutes.post('/post', ( req, res ) => {
	console.log( req.body );
	return fetchUserWithPhonenumber(req.body.From.substring( 1 )).then(data => {
		data = data[0];
		getUserCurrentQuestion( data.id ).then(currentQuestion => {
			// currentQuestion = currentQuestion[0];
			addQuestionResponse(currentQuestion.id, {
				user: data.id,
				body: req.body.Body
			}).then(()=>{
				removeQuestionFromUser(data.id);
			})
		})
		//get the current question from the user
		
		// return knex('questions').update({responses: [...data[0].questions,req.body.Body]}).where('users', data[0].id);
	}).then(( ) => res.status( 200 ).send( 'ok' )).catch(err => console.error( err ));
});

mRoutes.get("/get/:messageID", ( req, res, next ) => {
	client
		.messages( req.params.messageID )
		.fetch( )
		.then(msg => {
			console.log( msg.body )
			res
				.status( 200 )
				.json({ message: msg.body });
		})
})

module.exports = mRoutes;
