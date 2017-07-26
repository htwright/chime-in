const knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  pool: {
    min:0,
    max:2
  }
});

const fetchUserWithPhonenumber = (phonenumber) => {
  phonenumber = phonenumber.toString();
  console.log(phonenumber);
  return knex('users').where('phonenumber', phonenumber).then(data => data).catch(err => console.error(err));
};

module.exports = fetchUserWithPhonenumber;