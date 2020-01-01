const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const { handleError } = require('./src/services/error');
const routes = require('./src/controllers');

const app = express();

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, GET');
    return res.status(200).json({});
  }

  next();
  return null; // to avoid eslint-consistent-return error
});

app.use('/api', routes);

app.use((error, req, res) => {
  handleError(error, res);
});

module.exports = app;
