const conf = require("../../config");
const knex = require('../knex')();

const createVerifyStatus = (userId,adminId, status="verified") => {
  return knex('verify')
    .insert({userid:userId,adminid:adminId,status: status})
    .then(data => data).catch(err => console.error(err));
};



module.exports = createVerifyStatus;
