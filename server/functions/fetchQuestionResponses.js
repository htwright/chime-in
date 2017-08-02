const conf = require( "../config" );
const knex = require( './knex' )( );

let fetchquestionResponses = ( id ) => {
	return knex( 'questions' )
		.where({ id: id })
		.returning( "responses" )
		.then(data => data[0])
		.catch(err => console.error( err ));
};

module.exports = fetchquestionResponses;
