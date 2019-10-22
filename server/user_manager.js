const routes = require('./routes');
const db = require('./db_manager');

routes.app.get(routes.root + '/user/:id', (req, res) => {
    db.getUser(req.params.id).then(data => res.send(data)); // TODO: Catch rejection
});