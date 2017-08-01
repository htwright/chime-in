const conf = require("../config");

const knex = require('./knex')();

let addquestionResponse = (id, response) => {
  return knex('questions').where({id:id}).then(data=>{
    console.log(data[0])
    console.log(response);

    //let newArr =
  })
};

module.exports = addquestionResponse;
