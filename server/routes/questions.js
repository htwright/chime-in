const conf 							= require( "../config" );
const bodyParser 				= require( 'body-parser' );
const qRoutes 					= require( 'express' ).Router( );
const addQuestionToUser = require( "../functions/addQuestionToUser" );
const fetchUserWithId 	= require( "../functions/fetchUserWithId" );
const Messages 					= require( "../functions/messages" );
const knex 							= require( '../functions/knex' )( );
const messages 					= new Messages;

qRoutes.use(bodyParser.json( ));
qRoutes.use(bodyParser.urlencoded({ extended: true }));

//GET questions
qRoutes.get('/questionsList', ( req, res ) => {
	console.log( "Hit the questions list component." )
	knex( 'questions' )
		.select( 'id', 'question', 'responses', 'users' )
		.then(results => {
			res.send( results );
		})
		.catch(err => console.error( err ));
});

//GET an admin's questions

qRoutes.get('/questionsList/:id', ( req, res ) => {
	knex( 'questions' )
		.where( 'admin', req.params.id )
		.select( '*' )
		.returning( '*' )
		.then(data => res.status( 200 ).send( data ))
		.catch(err => console.error( err ));
});

qRoutes.post("/new", ( req, res ) => {
	knex( "questions" )
		.select( "admin", "question", "responses" )
		.insert( req.body )
		.returning( "id" )
		.then(messageId => {
			//now we need to actually send the question to the related people.  So we need a function to grab the users from an array
			req
				.body
				.users
				.forEach(el => {
					//add the question to the users, then send the message.
					addQuestionToUser( el, messageId );
					fetchUserWithId( el ).then(user => {
						user = user[0];
						console.log( "Logging the number" );
						console.log( user );
						messages.send( req.body.question, user.phonenumber );
					})

				})
			res.send( "Made the question!" );
		})
		.catch(err => console.error( err ));
});

module.exports = qRoutes;
