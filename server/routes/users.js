require('dotenv').config();
const bodyParser = require('body-parser');
const uRoutes = require('express').Router();

uRoutes.use(bodyParser.json());
uRoutes.use(bodyParser.urlencoded({
  extended: true
}));
const knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  pool: {
    min:0,
    max:2
  }
});

//function to add a user
// let x =knex.select().table("users").then(el=>{
//     console.log("In the users route area");
//     console.log(el);
// });

uRoutes.post('/new', (req,res,next)=>{
  let userData = Object.assign({},req.body);
  console.log('User data is...');
  console.log(JSON.stringify(userData,null,2));
  knex('users').select('id','name','phonenumber','email','slack')
    .where({name:userData.name})
    .orWhere({phonenumber:userData.phonenumber})
    .orWhere({email:userData.email})
    .then(list=>{
      if(list.length>0){
        //update info
        knex('users').select().where({id:list[0].id}).update({userData});
      }else{
        knex('users').insert(userData).then(el=>{
          console.log('el is ');
          console.log(el);
        });
      }
      res.send('done');
    });
});
  //GET of all users
uRoutes.get('/',(req,res)=>{
  let users = req.params.users;

  knex('users').then(list=>{
    res.send(list.map(el=>el));
  });
});

uRoutes.get('/get/:users',(req,res)=>{
  let users = req.params.users.split(',');

  knex('users').select().whereIn('id',users).then(list=>{
    res.send(list.map(el=>el));
  });
});

module.exports=uRoutes;
