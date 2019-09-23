const express = require('express');
const app = express();
exports.app = app;

// Set routes
app.use(express.static(__dirname + '/public'));

// Posts
const root = '/api';
// app.get(root + '/posts', ())