const conf = require("../config");
const knex = require('./knex')();
const getQuestion = require("./getQuestion");

const getCurrentQuestion = (userId) => {
  return knex('users').where({id:userId}).returning("questions")
    .then(data => {
      //if array, then
      let questions = data[0].questions;
      if(questions){
        if(Array.isArray(questions)){
          return questions[0];
        }else{
          //single entry, simply return it.
          return questions;
        }
      }else{
        return null;
      }
      }).then(questionId=>{
        
        if(questionId){
          //get the question
          return getQuestion(questionId)
        }else return null;
    }
      ).catch(err => console.error(err));
};



module.exports = getCurrentQuestion;
