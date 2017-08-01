const R = require("ramda");
const conf = require("../config");
const knex = require('./knex')();
const fetchUser = require("./fetchUserWithId");

const updateUser = (id, toUpdate,add=true) => {
  fetchUser(id).then(user=>{
    user = user[0];
    let acc = {};
    Object.keys(toUpdate).forEach(el=>{
      //a note: postgres return null for arrays if they contain nothing.
      //so Array.isArray is useless.  Thanks, Postgres, super helpful.
      //console.log(toUpdate)
      let element = user[el];
      //console.log(element);
      if(el==="questions"){
        if(add){          
          if(!Array.isArray(toUpdate[el])) toUpdate[el] = [toUpdate[el]];
          //check if value is duplicate
          if(element === null) element = toUpdate[el];
          else if(!Array.isArray(element)) element = [element, ...toUpdate[el]];
          else element = [...element, ...toUpdate[el]];
          console.log(element);
          //remove duplicates
          element = R.uniq(element);
        }

      }
      acc[el] = element;
    })

    knex("users").where({id: id}).update(acc).then(response=>{
      console.log("response is " + response);
    })
  })
};

module.exports = updateUser;
