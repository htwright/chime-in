require( 'dotenv' ).config( );
const bodyParser                = require( 'body-parser' );
const uRoutes                   = require( 'express' ).Router( );
const fetchUserWithPhonenumber  = require( '../functions/fetchUser' );
const createVerifyStatus        = require( "../functions/verification/createVerifyStatus" );
const fetchTargets              = require( '../functions/fetchTargets' );
const getUserCurrentQuestion    = require('../functions/getUserCurrentquestion');
const knex                      = require( '../functions/knex' )( );

uRoutes.use(bodyParser.json( ));
uRoutes.use(bodyParser.urlencoded({ extended: true }));


//function to add a user
// let x =knex.select().table("users").then(el=>{
//     console.log("In the users route area");
//     console.log(el);
// });

uRoutes.post("/test", ( req, res, next ) => {
  //test endpoint for you to drop your experimental code into.
  // console.log(req.body.id);
	getUserCurrentQuestion(req.body.id).then(result=>console.log(result));

})

uRoutes.post("/new", ( req, res, next ) => {
	//added in a default state of verify to each user.
	let userData = Object.assign( {
		state: "verify"
	}, req.body );
	console.log( "User data is..." );
	console.log(JSON.stringify( userData, null, 2 ));
	knex( "users" )
		.select( "id", "name", "phonenumber", "email", "slack" )
		.where({ name: userData.name })
		.orWhere({ phonenumber: userData.phonenumber })
		.orWhere({ email: userData.email })
		.then(list => {
			if ( list.length > 0 ) {
				//update info
				knex( "users" )
					.select( )
					.where({ id: list[0].id })
					.update({ userData });
			} else {
				knex( "users" )
					.insert( userData )
					.then(el => {
						console.log( "el is " );
						console.log( el );
					})
			}
			res.send( "done" );
		})
})

uRoutes.get('/', ( req, res ) => {
	let users = req.params.users;

	knex( 'users' )
		.select( )
		.then(list => {
			res.send(list.map( el => el ));
		})
		.catch(err => console.error( err ));
});

uRoutes.get("/get/:users", ( req, res ) => {
	let users = req
		.params
		.users
		.split( "," );

	knex( "users" )
		.select( )
		.whereIn( "id", users )
		.then(list => {
			res.send(list.map( el => el ));
		})
		.catch(err => console.error( err ));
});

uRoutes.get('/targets/:id', ( req, res ) => {
	return fetchTargets( req.params.id )
		.then(data => res.status( 200 ).json( data ))
		.catch(err => console.error( err ));
});

uRoutes.get('/phonenumber/:phonenumber', ( req, res ) => {
	return fetchUserWithPhonenumber( req.params.phonenumber )
		.then(data => res.status( 200 ).json( data ))
		.catch(err => console.error( err ));
});

uRoutes.put('/update/:id', ( req, res ) => {
	knex( 'users' )
		.where( 'id', req.params.id )
		.update( req.body.user )
		.returning( '*' )
		.then(( data ) => {
			res
				.status( '200' )
				.json( data );
		})
		.catch(err => console.error( err ));
});

uRoutes.delete('/:id', ( req, res ) => {
	knex( 'users' )
		.where( 'id', req.params.id )
		.del( )
		.then(( ) => res.status( '200' ).json( 'ok' ))
		.catch(err => console.error( err ));
});

module.exports = uRoutes;
