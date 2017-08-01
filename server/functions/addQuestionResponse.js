const conf = require("../config");

const knex = require('./knex')();

let addquestionResponse = (id, response) => {
  console.log(id);
  return knex('questions').where({id:id}).returning("responses").then(data=>{
    console.log(data)
  })
};

module.exports = addquestionResponse;
