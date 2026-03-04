//Express configuration:Configure middleware,Register routes,Handle errors,Export Express app

// Load express
const express = require('express');

const globalErrorHandler = require('./middlewares/error.middleware');

// Create express app //execute express;
const app = express(); 

const cookieParser = require('cookie-parser');
app.use(cookieParser());

// load CORS module
const cors = require('cors');

app.use(express.json()); //execute
app.use(cors()); //execute

/*Routes with Router Modularization and API versioning*/
const routes = require('./routes/v1/index.routes');
app.use('/api/v1', routes);

app.use('*', (req, _, next) => {
    const err = new Error(`Route ${req.originalUrl} not found`);
    err.statusCode = 404;
    next(err);
});

app.use(globalErrorHandler);

// Export app (express)
module.exports = app;