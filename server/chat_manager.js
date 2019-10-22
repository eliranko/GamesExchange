const db = require('./db_manager');
const chat = require('./models/chat');
const routes = require('./routes');

routes.app.get(routes.root + '/chat', (req, res) => {
    db.getChats('1').then(data => res.send(data)); // TODO: handle rejects
});