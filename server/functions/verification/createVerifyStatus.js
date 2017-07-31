const conf = require("../../config");
const knex = require('../knex')();

const findVerifyStatus = (userId,adminId) => {
  return knex('verify')
    .insert({userid:userId,adminid:adminId,status: "verified"})
    .then(data => data).catch(err => console.error(err));
};



module.exports = findVerifyStatus;
