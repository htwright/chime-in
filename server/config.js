require('dotenv').config();
exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL;

exports.TEST_DATABASE_URL = (
    process.env.TEST_DATABASE_URL
);
exports.PORT = process.env.PORT || 8080;
exports.TWILIO_SID = process.env.TWILIO_SID;
exports.TWILIO_AUTH = process.env.TWILIO_AUTH;
