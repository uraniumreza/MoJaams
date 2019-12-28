const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const { handleError } = require('./server/services/error');
const routes = require('./server/routes');

// Set up the express app
const app = express();

// TODO: Use Morgan for logging!
// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup routes
app.use('/api', routes);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

// Error handling Middleware
app.use((error, req, res) => {
  handleError(error, res);
});

module.exports = app;
