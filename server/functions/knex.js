const conf = require( "../config" );
function Knex( ) {
	const knex = require( 'knex' )({
		client: 'pg',
		connection: process.env.DATABASE_URL,
		pool: {
			min: 0,
			max: 2
		}
	});
	return knex;
}

module.exports = Knex;
