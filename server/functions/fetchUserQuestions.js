const knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  pool: {
    min:0,
    max:2
  }
});

let fetchUserQuestions = (arr = []) => {
  if (arr.length){
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
  return knex.select().from('questions').where('admin', id).then(data => data).catch(err => console.error(err));
};

module.exports = fetchUserQuestions;