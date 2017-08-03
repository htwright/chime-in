const conf = require( "../config" );
const knex = require( './knex' )( );

let knexFetch = id => {
	return knex( 'users' )
		.select( )
		.where( 'id', id )
		.then( data => data )
		.catch(err => console.error( err ));
};

let removeQuestionFromUser = ( id ) => {
	knexFetch(id).then(user=>{
		if(user){
			user = user[0];
			if(user.questions.length>0){
				let questions = [...user.questions];
				questions = questions.splice(1);
				//make the questions arra
				// console.log(user);
				return questions;
			}
		}
	}).then(questions=>{
		console.log(questions);
		//update the user
		knex("users").where({"id":id}).update({"questions":questions}).then(response=>{
			console.log(response);
		});
	})
};

module.exports = removeQuestionFromUser;
