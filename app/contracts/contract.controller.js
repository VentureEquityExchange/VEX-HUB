var mongoose = require('mongoose'),
  Contract = require('./contract.model'),
  cUtils = require('./contract.utilities'),
  Promise = require('bluebird');

exports.get = function(req, res, next){
  Contract.find({}, function(err, contracts){
    if(err){res.send(err)}
      res.send(contracts);
  });
}

exports.deploy = function(req, res, next){
  var contract = req.params.contract;

  cUtils.deploy(contract).then(function(deployed){
    res.send(deployed);
  }).catch(function(error){
    res.send(error);
  });
}

exports.add = function(req, res, next){
  var contract = req.params.contract;

  cUtils.add(contract).then(function(data){
    res.send(data);
  }).catch(function(error){
    res.send(error);
  });
}

exports.update = function(req, res, next){

}