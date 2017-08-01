const conf = require("../config");

const knex = require('./knex')();

let addquestionResponse = (id, response) => {
  return knex('questions').where({id:id}).then(data=>{
    console.log(data[0].responses)
    console.log(response);
    let newArr= [];
    if(data[0].responses){
      newArr = [response, ...data[0].responses];
    }else{
      newArr = [response];
    }
    knex('questions').where({id:id}).update({responses:newArr});
  })
};

module.exports = addquestionResponse;
