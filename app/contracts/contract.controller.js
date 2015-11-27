var mongoose = require('mongoose'),
  Contract = require('./contract.model'),
  cUtils = require('./contract.utilities');


exports.get = function(req, res, next){
  Contract.find({}, function(err, contracts){
    if(err){res.send(err)}
      res.send(contracts);
  });
}

exports.deploy = function(req, res, next){
  var contract = req.params.contract;

  cUtils.deploy(contract).then(function(deployed){
    console.log('Deployed Contract:  '+deployed);
    return cUtils.save(deployed);
  }).then(function(saved){
    res.send(saved);
  }).catch(function(error){
    res.send(error);
  });
}

exports.update = function(req, res, next){

}