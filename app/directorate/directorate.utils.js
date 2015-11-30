var Promise = require('bluebird');
var fs = require('fs');
var path = require('path');
var contractsFolder = path.normalize(__dirname+'/directorate_contracts');
var async = require('async');

function getContracts(){
	var Contracts = [];
	return new Promise(function(resolve, reject){
		fs.readdir(contractsFolder, function(err, contracts){
			if(err) {reject(err)};
			async.forEach(contracts, function(contract, callback){
			    fs.readFile(contractsFolder+'/'+contract, {encoding: 'utf8'}, function(err, content){
			    	if(err) {reject(err)};
			    	Contracts.push({file: contract, source: content});
			    	callback();
			    });
			  }, function(err){
			    if(err){
			    	reject(err);
			    }else{
			    	resolve(Contracts);
			    }
			  }
			);			
		});
	});
}

exports.getContracts = getContracts;