const path = require('path');
const express = require('express');
const conf = require("./config");
let messageRoutes = require("./routes/messages");
let userRoutes = require("./routes/users");
let questionRoutes = require("./routes/questions");
let adminRoutes = require("./routes/admins");
let knex = require("./functions/knex.js")();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;

let secret = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  DATABASE_URL: process.env.DATABASE_URL
}

if(process.env.NODE_ENV != 'production') {
  secret = require('./secret');
}
const app = express();

// const {PORT, DATABASE_URL} = require('./config');
app.use(passport.initialize());

passport.use(
    new GoogleStrategy({
        clientID: secret.CLIENT_ID,
        clientSecret: secret.CLIENT_SECRET,
        callbackURL: `/api/auth/google/callback`
    },
    (accessToken, refreshToken, profile, cb) => {

        const userData = {
          name: profile.displayName,
          accesstoken: accessToken,
          _id: profile.id
        }

        knex('users').where({_id: profile.id})

        .then(user => {

          if(!user.length) {
            knex("users").insert(userData).then(user=>{
              return cb(null, userData)

            })
          }
          else  {
            return cb(null, userData)
          }
        })

        .catch(err => console.log(err))

        // return knex('users').where({ id: profile.id }, (err, user) => {
        //   console.log('aldskfjaldskjfadlsjkfsdakljfa')
        //   if (user) console.log("USER", user)
        //   if(err) console.log("ERROR", err)
        //   if(!user.length) {
        //     return knex('users').insert({
        //       accessToken: accessToken,
        //       id: profile.id,
        //       name: name,
        //       email: email,
        //       phonenumber: phonenumber
        //     })
        //   return cb(null,   return cb(null, user)<<        u></u>s></us>e></use>r)ser)
        //   } else {
        //     return cb(null, user[0])
        //   }
        // })
    }
));

passport.use(
    new BearerStrategy(
        (token, done) => {
            console.log('token', token)
                            //
            knex('users').where({ accesstoken: token })


            .then(user => {
              console.log('BEARER USERS', user);
              return done(null, user[0])
            })

            .catch(err => {
              console.log("ERROR", err)
              return done(null, false);
            });
        }
    )
);

app.get('/api/auth/google',
    passport.authenticate('google', {scope: ['profile']}));

app.get('/api/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/',
        session: false
    }),
    (req, res) => {
        console.log('ACCESSTOKEN', req.user.accesstoken)
        res.cookie('accessToken', req.user.accesstoken, {expires: 0});
        res.redirect('/');
    }
);

app.get('/api/auth/logout', (req, res) => {
    req.logout();
    res.clearCookie('accessToken');
    res.redirect('/');
});

// API endpoints go here!
app.get('/api/me',
    passport.authenticate('bearer', {session: false}),
    (req, res) => {
    console.log('inside api/me')

      res.json({
        _id: req.user._id
    })}
);

// API endpoints go here!
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/admins", adminRoutes);

// Serve the built client
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Unhandled requests which aren't for the API should serve index.html so
// client-side routing using browserHistory can function
app.get(/^(?!\/api(\/|$))/, (req, res) => {
  const index = path.resolve(__dirname, '../client/build', 'index.html');
  res.sendFile(index);
});

let server;
function runServer(port=3001) {
  return new Promise((resolve, reject) => {
    server = app.listen(port, () => {
      resolve(server);
    }).on('error', reject);
  });
}

function closeServer() {

  return new Promise((resolve, reject) => {
    server.close(err => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}

if (require.main === module) {
  runServer();
}

module.exports = {
  app, runServer, closeServer
};
