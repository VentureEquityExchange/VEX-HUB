var mongoose = require('mongoose'),
  Contract = require('./contract.model'),
  cUtils = require('./contract.utilities');


exports.get = function(req, res, next){
  res.send('Hello');
}

exports.deploy = function(req, res, next){
  res.send('deploy');
}