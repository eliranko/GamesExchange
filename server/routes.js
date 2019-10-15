const express = require('express');
const app = express();
exports.app = app;
exports.root = '/api';

// serve static resources
app.use(express.static(__dirname + '/public'));

require('./chat');
require('./posts');