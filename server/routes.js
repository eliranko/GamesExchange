const express = require('express');
const posts = require('./posts');
const chat = require('./chat');
const app = express();
exports.app = app;

// Set routes
app.use(express.static(__dirname + '/public'));

const root = '/api';
// Posts
app.get(root + '/posts', (req, res) => {
    res.send(posts.getPosts());
});

// Chat
app.get(root + '/chat', (req, res) => {
    res.send(chat.getChat());
});