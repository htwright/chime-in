const knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  pool: {
    min:0,
    max:2
  }
});

module.exports = {

  findUserById: function(profileId) {
    return knex('users').select().where({ googleId: profileId }).first();
  },

  createUser: function(profileId) {
    return knex('users').insert({ googleId: profileId });
  }
};
