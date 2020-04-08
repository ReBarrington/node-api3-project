const express = require('express');

const postRouter = require("./posts/postRouter.js");

const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use(express.json()); // built-in middleware, no need to install it
//custom middleware
server.use(logger);

//endpoints
server.use("/api/posts", postRouter);

server.get("/", (req, res) => {
  const nameInsert = req.name ? ` ${req.name}` : "";

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

function logger(req, res, next) {
  // logs request method, request url, and a timestamp to the console
  console.log(`Request Method: ${req.method}, Request URL: ${req.originalUrl}, TimeStamp: ${Date.now()}`)
  next();
}

module.exports = server;
