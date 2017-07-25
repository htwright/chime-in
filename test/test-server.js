require('dotenv').config();
let Twilio = require('twilio');
let client = new Twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

const chai = require('chai');
const chaiHttp = require('chai-http');
const jsonParser = require('body-parser').json();
const should = chai.should();

const knex = require('knex')({
  client: 'pg',
  connection: 'postgres://qngtezbe:23PPRvLs82vehByYKZUMRd0cGBKdweYc@stampy.db.elephantsql.com:5432/qngtezbe',
  pool: {
    min: 0,
    max: 2
  }
});

const { app, runServer, closeServer } = require('../server/index');
//runServer(process.env.PORT || 8080);

app.use(jsonParser);
chai.use(chaiHttp);

//PARENT DESCRIBE Function runs & closes Server
describe('Backend unit tests', function() {

  before(function() {
    
    return runServer(process.env.PORT || 8080);
  });

  after(function() {
    return closeServer();
  });


  describe('User endpoint tests', function(){

    it('should write new users to the database', function(){
      let userData = {
        name: 'test',
        phonenumber: 'test',
        email: 'test',
        slack: 'test',
        type: 'admin'
      };
      let returnData;
      knex('users').insert(userData).returning('*').then(data => {
        returnData = data;
        chai.request(app)
        .get(`/api/users/get/${data.id}`);
      })
      .then(apiItem => {
        apiItem.id.should().equal(returnData.id);
      })
      .catch(err => console.error(err));
    });

  });
});
