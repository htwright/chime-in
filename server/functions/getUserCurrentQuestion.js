const conf        = require( "../config" );
const knex        = require( './knex' )( );
const getQuestion = require( "./getQuestion" );

const getCurrentQuestion = ( userId ) => {
	return knex( 'users' )
		.where({ id: userId })
		.returning( "questions" )
		.then(data => {
      //if array, then
      console.log('DATA', data);
			let questions = data[0].questions;
			if ( questions ) {
				return questions[0];
			} else {
				return null;
			}
		})
		.then(questionId => {
      console.log('QUESTION ID', questionId)
			if ( questionId ) {
				//get the question
				return getQuestion( questionId )
			} else
				return null;
			}
		)
		.catch(err => console.error( err ));
};

module.exports = getCurrentQuestion;