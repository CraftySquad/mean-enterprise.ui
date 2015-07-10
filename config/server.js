/**
 * @module server
 * @file local server to serve mock data
 * @type {*|exports|module.exports}
 */
var express = require('express');
var app = express();
var __data = __dirname + '/data/';
var port = 8100;

/**
 * middleware executed for every request
 */
app.use(function(req, res, next) {
  // enable cors
  res.header('Access-Control-Allow-Origin', '*');
  // allow headers
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  // continue matching subsequent routes
  next();
});

/**
 * @description vehicles route
 */
app.get('/api/vehicle/list', function(req, res) {
  var response = require(__data + 'vehicles.json');
  res.status(200).json(response);
});

/**
 * @description logout route
 */
app.post('/api/account/logout', function(req, res) {
  var response = {
    statusText: 'logged out'
  };

  res.status(200).json(response);
});

/**
 * @description token route
 */
app.post('/token', function(req, res) {
  var response = {
    token: 'zew230ojafjlkjc2349dfafdf00ljlj00nnnVVVawe'
  };

  res.status(200).json(response);
});

/**
 * @description error handler
 */
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

/**
 * start server
 */
var server = app.listen(port, onStart);

/**
 * @method onStart
 * @description on server start
 */
function onStart() {
  var port = server.address().port;
  console.log('MEAN-Enterprise listening on port:%s', port);
}
