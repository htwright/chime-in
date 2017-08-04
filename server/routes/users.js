require( 'dotenv' ).config( );
const bodyParser                = require( 'body-parser' );
const uRoutes                   = require( 'express' ).Router( );
const fetchUserWithPhonenumber  = require( '../functions/fetchUser' );
const fetchUserWithEmail        = require('../functions/fetchUser');
const createVerifyStatus        = require( "../functions/verification/createVerifyStatus" );
const fetchTargets              = require( '../functions/fetchTargets' );
const removeQuestionFromUser    = require('../functions/removeQuestionFromUser');
const knex                      = require( '../functions/knex' )( );
const Messaging									= require( '../functions/messages');
const sendEmail									= require( "../functions/sendEmail" );
const messages 									= new Messaging();

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
})

uRoutes.post("/new", ( req, res, next ) => {
	console.log('is this hitting?')
  console.log(req.body.admin);
  console.log(req.body.admin);
	knex('users').select().where({ name: req.body.name}).then(result=>{
		if(result.length>0){
			throw new Error('User already exists');
		}else{
			return knex( "users" )
				.insert({
					name: req.body.name,
					phonenumber: req.body.phonenumber,
					email: req.body.email,
					preferred: req.body.preferred,
					lastuser: req.body.admin
				}).then(user => {
					knex("users").select().where({name:req.body.name}).then(user=>{
						console.log("USER",user)
						console.log(user[0].preferred)
						if(user[0].preferred==="Text"){
							console.log("sending verify message");
							messages.send("Hello, this is Simmetric.  A user of our site would like to send you questions.  Type yes if this is OK, otherwise type no to prevent them from doing so.",user[0].phonenumber);
						}else if(user[0].preferred==="Email"){
							createVerifyStatus(user[0].id,req.body.admin, "verified");
							sendEmail(user[0].email,"You were just signed up for Simmetric.  There's no way to unsign up, so hold on for dear life!");
						}
						res.status(200).json({message: 'Added a user'});
					})


				})
				.catch(err => console.error( err ));
		}
	})
});


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

uRoutes.get("/getByEmail/:users", (req, res) => {
  let users = req.params.users.split(",");

  knex("users").select().whereIn("email", users)
    .then(list => {
      res.send(list.map(el=>el));
    })
    .catch(err => console.error(err));
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
