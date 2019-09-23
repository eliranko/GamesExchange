const routes = require('./routes');
const port = 3000;

routes.app.listen(port, () => console.log(`started listening on ${port}`));

