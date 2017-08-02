/**
	This is the Chime In server app.  It handles all the sending and receiving of the messages.  It is powered by Node and Express, with Postgres managed through Knex for the database.
*/

const path          = require( 'path' );
const express       = require( 'express' );
const conf          = require( "./config" );
let messageRoutes   = require( "./routes/messages" );
let userRoutes      = require( "./routes/users" );
let questionRoutes  = require( "./routes/questions" );
let adminRoutes     = require( "./routes/admins" );
let knex            = require( "./functions/knex.js" )( );

const app = express( );

// API endpoints go here!

/** Message api hits are redirected to the messageRoutes file */
app.use( "/api/messages", messageRoutes );
/** Users api hits are redirected to the userRoutes file */
app.use( "/api/users", userRoutes );
/** Question api hits are redirected to the questionRoutes file */
app.use( "/api/questions", questionRoutes );
/** Admin api hits are redirected to the adminRoutes file */
app.use( "/api/admins", adminRoutes );

// Serve the built client
app.use(express.static(path.resolve( __dirname, '../client/build' )));

// Unhandled requests which aren't for the API should serve index.html so
// client-side routing using browserHistory can function
app.get(/^(?!\/api(\/|$))/, ( req, res ) => {
	const index = path.resolve( __dirname, '../client/build', 'index.html' );
	res.sendFile( index );
});

let server;
function runServer( port = 3001 ) {
	return new Promise(( resolve, reject ) => {
		server = app.listen(port, ( ) => {
			resolve( server );
		}).on( 'error', reject );
	});
}

function closeServer( ) {

	return new Promise(( resolve, reject ) => {
		server.close(err => {
			if ( err ) {
				return reject( err );
			}
			resolve( );
		});
	});
}

if ( require.main === module ) {
	runServer( );
}

module.exports = {
	app,
	runServer,
	closeServer
};
