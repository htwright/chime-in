const conf = require("../config");

const knex = require('./knex')();

let fetchAdminQuestions = (id = 0) => {
  let arr = [id];
  if (id > 0){
    return Promise.all(arr)
    .then(val => knexFetch(parseInt(val)))
    .catch(err => {
      console.error(err);
      return 'No users found/invalid function input';
    });
  } else {
    return 'No users found/invalid function input';
  }
};

let knexFetch = id => {
  return knex('questions').select().where('admin', id).then(data => data).catch(err => console.error(err));
};

module.exports = fetchAdminQuestions;
