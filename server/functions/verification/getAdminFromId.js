const conf = require( "../../config" );
const knex = require( '../knex' )( );

const getAdminFromId = ( id ) => {
	return knex( 'users' )
		.where({ id: id })
		.then(data => {
			if ( data.length === 0 )
				return null;
			return data[0];
		})
		.catch(err => console.error( err ));
};

module.exports = getAdminFromId;
