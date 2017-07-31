const conf = require("../../config");
const knex = require('../knex')();

const updateVerifyStatus = (userId,adminId, status="verified") => {
  // console.log(`user id: ${userId}, admin id: ${adminId}`)
  return knex('verify').where({userid:userId,adminid:adminId})
    .update({status: status})
    .then(data => {
      return data;
    }).catch(err => console.error(err));
};



module.exports = updateVerifyStatus;
