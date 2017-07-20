require('dotenv').config();
const bodyParser = require('body-parser');
const uRoutes = require('express').Router();

uRoutes.use(bodyParser.json());

const knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL
});

//function to add a user
// let x =knex.select().table("users").then(el=>{
//     console.log("In the users route area");
//     console.log(el);
// });

uRoutes.post("/new", (req,res,next)=>{
  let userData = Object.assign({},req.body);
  console.log("User data is...");
  console.log(JSON.stringify(userData,null,2));
  knex("users").select("id","name","phonenumber","email","slack")
    .where({name:userData.name})
    .orWhere({phonenumber:userData.phonenumber})
    .orWhere({email:userData.email})
    .then(list=>{
      if(list.length>0){
        //update info
        knex("users").select().where({id:list[0].id}).update({userData});
      }else{
        knex("users").insert(userData).then(el=>{
          console.log("el is ");
          console.log(el);
        })
      }
      res.send("done");
    })
})

uRoutes.get("/get/:users",(req,res)=>{
  let users = req.params.users.split(",");

  knex("users").select().whereIn("id",users).then(list=>{
    if(list.length > 1){
      res.send(list.map(el=>el.phonenumber.toString()));
    }else{
      res.send(list[0].phonenumber);
    }

  })
})

//add the questions to the users
//uRoutes.post("/addQuestion/:users")

module.exports=uRoutes;
