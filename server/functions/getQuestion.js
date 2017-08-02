const conf = require( "../config" );
const knex = require( './knex' )( );

const getQuestion = ( id ) => {
	return knex( 'questions' )
		.where({ id: id })
		.then(data => {
			console.log(data)
			return data[0];
		})
		.catch(err => console.error( err ));
};

module.exports = getQuestion;
