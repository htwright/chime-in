const conf = require("../../config");
const knex = require('../knex')();

const findVerifyStatus = (userId,adminId) => {
  // console.log(`user id: ${userId}, admin id: ${adminId}`)
  return knex('verify').where({userid:userId,adminid:adminId})
    .then(data => {
      console.log(data.length);
      return data;
    }).catch(err => console.error(err));
};



module.exports = findVerifyStatus;
