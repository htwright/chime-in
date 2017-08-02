const conf = require("../config");
const knex = require('./knex')();

const fetchUserWithPhonenumber = (phonenumber) => {
  phonenumber = phonenumber.toString();
  console.log(phonenumber);
  return knex('users').where('phonenumber', phonenumber).then(data => data).catch(err => console.error(err));
};

const fetchUserWithEmail = (email) => {
  console.log(email);
  return knex('users').where('email', email)
    .then(data => data)
    .catch(err => console.error(err));
}

module.exports = fetchUserWithPhonenumber, fetchUserWithEmail;
