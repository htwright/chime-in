//purpose: middleware that runs whenever a message comes in.
const conf 										= require( "../config" );
const Messaging 							= require( "./messages" );
const fetchUser               = require( "./fetchUser" )
const updateUser              = require( "./updateUser" );
const getUserCurrentQuestion  = require( "./getUserCurrentquestion" );
const findVerifyStatus        = require( "./verification/findVerifyStatus" );
const createVerifyStatus      = require( "./verification/createVerifyStatus" );
const updateVerifyStatus      = require( "./verification/updateVerifyStatus" );
const messageReducerLogic     = require( "./messageReducerLogic" );
const knex 										= require( './knex' )( );
const Message = new Messaging( );

MessageReducer = ( req, res, next ) => {
	let message = req.body;
	//console.log("phone number is.............")
	//console.log(message.From);

	fetchUser(message.From.substring( 1 )).then(user => {
		user = user[0];
		getUserCurrentQuestion( user.id ).then(currentQuestion => {
			if ( currentQuestion ) {
        console.log(currentQuestion);
				findVerifyStatus( user.id, currentQuestion.admin ).then(result => {
					//now do stuff depending on whether the user verified that admin.

					if ( result !== null ) {
						//cast result into array if it isn't one
						if ( result.length > 0 ) {
							if ( result[0].status === "verified" ) {
								//do normal account stuff that's broken out into its own function.
								messageReducerLogic(message, user, next, currentQuestion[0]);
							} else {
								//check if the user sent reenable
								if ( message.Body === "reenable" ) {
									//update verification status with the function
									updateVerifyStatus( user.id, currentQuestion[0].admin );
									Message.send( "Got it, they can send you questions again.  Type !!current to get your current question.", message.From );
								} else {
									Message.send( "You aren't verified with this person!  Send reenable to let them send you questions.", message.From );
								}
							}
						} else {
							//I need to make sure the verification stuff happens here!
							Message.send( "I don't know who you're replying to.", message.From );
						}
					} else {
						console.log( "not verified, doing the checks for that." )
						//this fires if there is not verified status.  Create verified status based on what the person sent.
						if ( message.Body.toLowerCase( ) === "yes" ) {
							//user is verified, reply and then create auth token.
							Message.send( "Awesome, you are verified!  Here's your question:", message.From );
							Message.send( currentQuestion[0].question, message.From, 1000 );
							createVerifyStatus( user.id, currentQuestion[0].admin );
						} else if ( message.Body.toLowerCase( ) === "no" ) {
							Message.send( "Okay, that person has been blocked from sending you questions.  Reply with reenable if you did this in error.", message.From );
							createVerifyStatus( user.id, currentQuestion[0].admin, "revoked" );
						} else {
							Message.send( "I'm sorry, I didn't understand that.  Please send yes if you want to allow the sender to send you messages, or no if not.", message.From );
						}
					}

				})
			} else {
				console.log( "no active question, so going into administrative mode." );
				Message.send( "You have no active questions.  Account management is due soon!", message.From );
			}

		})
	})

}

module.exports = MessageReducer;
