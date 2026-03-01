//Express configuration:Configure middleware,Register routes,Handle errors,Export Express app

// Load express
const express = require('express');

// Create express app //execute express;
const app = express(); 

// load CORS module
const cors = require('cors');

app.use(express.json()); //execute
app.use(cors()); //execute

/*Routes with Router Modularization and API versioning*/
const routes = require('./routes/v1/index.routes');
app.use('/api/v1', routes);

// Export app (express)
module.exports = app;