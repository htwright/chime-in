const chai = require('chai');
const chaiHttp = require('chai-http');
const jsonParser = require('body-parser').json();
// const faker = require('faker');
const should = chai.should();

const { app, runServer, closeServer } = require('../server/index');
const { TEST_DATABASE_URL, PORT } = require('../server/config');

app.use(jsonParser);
chai.use(chaiHttp);
console.log(TEST_DATABASE_URL);
runServer(TEST_DATABASE_URL);

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
    // for Mocha tests, when we're dealing with asynchronous operations,
    // we must either return a Promise object or else call a `done` callback
    // at the end of the test. The `chai.request(server).get...` call is asynchronous
    // and returns a Promise, so we just return it.
    return chai.request(app)
      .get('/api/hello')
      .then(function(res) {
        res.should.be.ok;
        //res.should.have.status(200);
        //res.should.be.json;
        //res.body.should.be.a('array');
       //res.body.length.should.be.at.least(1);
        // each item should be an object with key/value pairs
        //const expectedKeys = ['id', 'name', 'checked'];
        //res.body.forEach(function(item) {
          //item.should.be.a('object');
          //item.should.include.keys(expectedKeys);
      });
  });
});
