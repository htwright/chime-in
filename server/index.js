const path = require('path');
const express = require('express');
const {DATABASE_URL} = require('./config.js');
const app = express();
const knex = require('knex')({
  client: 'pg',
  connection: DATABASE_URL
});
// API endpoints go here!

app.get('/api/hello', (req, res) => {
  knex('test').insert({column1: 'c', column2: 5}).then(() =>
  res.json('ok').catch(err => console.error(err)));
});

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
      resolve();
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
