const conf = require("../config");
const knex = require('./knex')();

const fetchUserWithId = (id) => {  
  return knex('users').where('id', id).then(data => data).catch(err => console.error(err));
};



module.exports = fetchUserWithId;
