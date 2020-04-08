const express = require('express');

const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware
server.use(logger);

function logger(req, res, next) {
  // logs request method, request url, and a timestamp to the console
  console.log(`Request Method: ${req.method}, Request URL: ${req.originalUrl}, TimeStamp: ${Date.now()}`)
  next();
}

module.exports = server;
