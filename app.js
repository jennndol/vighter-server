const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

const index = require('./routes/index');
const auth = require('./routes/auth');
const log = require('./routes/log');

const authMiddleware = require('./middlewares/auth');
const userMiddleware = require('./middlewares/user');

require('dotenv').config();

mongoose.connect('mongodb://admin:admin@ds223019.mlab.com:23019/vighter', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('database connected');
  }
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/', index);
app.use('/auth', auth);
app.use('/log', authMiddleware, userMiddleware, log);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;
