require( 'dotenv' ).config( );
exports.DATABASE_URL 			= process.env.DATABASE_URL || global.DATABASE_URL;
exports.TEST_DATABASE_URL = ( process.env.TEST_DATABASE_URL );
exports.PORT 							= process.env.PORT || 8080;
exports.TWILIO_SID 				= process.env.TWILIO_SID;
exports.TWILIO_AUTH 			= process.env.TWILIO_AUTH;
exports.TWILIO_PHONE 			= process.env.TWILIO_PHONE;
exports.APP_URL 					= process.env.URL;
exports.CLIENT_ID         = process.env.CLIENT_ID;
exports.CLIENT_SECRET     = process.env.CLIENT_SECRET;
exports.URL 							= process.env.NODE_ENV === 'production'
	? "https://chime-in.herokuapp.com/"
	: 'http://localhost:8080';
