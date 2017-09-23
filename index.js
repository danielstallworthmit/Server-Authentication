// Imports
const exprees = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgn = require('mogan');
const app = express();

// App setup

// Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on port', port);