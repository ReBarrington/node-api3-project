// code away!
const server = require('./server.js');

// const port = 5000; This won't work because what if another application is running on this port?
// make the port dynamic... so now it will get the port from the environment object/heroku (process.env).
const port = process.env.PORT|| 5000; // use dynamic port, or if undefined (using locally), just use 5000 as default. 

server.listen(port, () => {
  console.log(`\n* Server Running on http://localhost:${port} *\n`);
});
