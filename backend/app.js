const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const { handleError } = require('./src/services/error');
const routes = require('./src/routes');

// Set up the express app
const app = express();

// TODO: Use Morgan for logging!
// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }

  next();
});

// Setup routes
app.use('/api', routes);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

// Error handling
app.use((error, req, res) => {
  handleError(error, res);
});

module.exports = app;
