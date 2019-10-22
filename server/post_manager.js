const routes = require('./routes');
const db = require('./db_manager');

routes.app.get(routes.root + '/post', (req, res) => {
    db.getPosts().then(data => res.send(data)); // TODO: Catch rejection
});