const conf = require("../../config");
const knex = require('../knex')();

const findVerifyStatus = (userId,adminId) => {
  return knex('verify').where({userid:userId,adminid:adminId})
    .update({"verify": "revoked"})
    .catch(err => console.error(err));
};



module.exports = findVerifyStatus;
