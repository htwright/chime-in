const conf = require("../config");
let Twilio = require('twilio');
let client = new Twilio(conf.TWILIO_SID, conf.TWILIO_AUTH);

const chai = require('chai');
const chaiHttp = require('chai-http');
const jsonParser = require('body-parser').json();
const should = chai.should();

const { app, runServer, closeServer } = require('../server/index');
//runServer(process.env.PORT || 8080);

app.use(jsonParser);
chai.use(chaiHttp);

//PARENT DESCRIBE Function runs & closes Server
describe('Backend unit tests', function() {

  before(function() {

    return runServer(conf.PORT || 8080);
  });

  after(function() {
    return closeServer();
  });

//Test Get Endpoint
  // test strategy:
  //   1. make request to `/api/hello`
  //   2. check response object keys
  it('should list all messages on GET', function() {
    // const knex = require('../functions/knex')({
    //   client: 'pg',
    //   connection: process.env.DATABASE_URL
    // });
    return chai.request(app)
      .get('/api/hello')
      .then(function(res) {
        res.should.be.ok;
        res.should.have.status(200);
        res.should.be.json;
      });
  });
});
