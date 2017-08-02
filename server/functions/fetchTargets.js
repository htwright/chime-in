const conf            = require( '../config' );
const knex            = require( './knex' )( );
const fetchUserWithId = require( './fetchUserWithId' )

const fetchTargets = ( id ) => {
	return knex( 'verify' )
		.where( 'adminid', id )
		.then(data => {
			const promiseArr = data.map(el => fetchUserWithId( el.userid ));
			return Promise
				.all( promiseArr )
				.then( values => values );
			// return data.map(el => fetchUserWithId(el.userid));
		});
};

module.exports = fetchTargets;
