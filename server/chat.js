const db = require('./db_manager');
const chat = require('./models/chat');
const routes = require('./routes');

// Chat
routes.app.get(routes.root + '/chat', (req, res) => {
    db.getChats().then(data => res.send(data)); // TODO: handle rejects
});