require('dotenv').config();
let Twilio = require("twilio")
let client = new Twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

const chai = require('chai');
const chaiHttp = require('chai-http');
const jsonParser = require('body-parser').json();
const should = chai.should();

const { app, runServer, closeServer } = require('../server/index');
runServer(process.env.PORT || 8080);

app.use(jsonParser);
chai.use(chaiHttp);

//PARENT DESCRIBE Function runs & closes Server
describe('Backend unit tests', function() {

  before(function() {
    return runServer();
  });

  after(function() {
    return closeServer();
  });

//Test Get Endpoint 
  // test strategy:
  //   1. make request to `/api/hello`
  //   2. check response object keys
  it('should list all messages on GET', function() {
    return chai.request(app)
      .get('/api/hello')
      .then(function(res) {
        res.should.be.ok;
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('string');
        res.body.length.should.be.at.least(1);
        // each item should be an object with key/value pairs
        //const expectedKeys = ['id', 'name', 'checked'];
        //res.body.forEach(function(item) {
          //item.should.be.a('object');
          //item.should.include.keys(expectedKeys);
      });
  });
});
