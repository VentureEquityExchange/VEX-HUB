

var express = require('express'),
  Promise = require('bluebird'),
  config = require('./config/config'),
  glob = require('glob'),
  mongoose = require('mongoose'),
  exec = require('child_process').exec,
  ethereumEnv = require('./config/ethereum_env');

mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
  require(model);
});
var app = express();

require('./config/express')(app, config);

app.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});


if(process.argv[2] == 'docker'){
	console.log('Process is Dockerized.');
	console.log('Ethereum Node Starting...');
	var Geth = exec('geth --testnet --rpc --rpccorsdomain http://localhost:3000', {maxBuffer: 1024*600}, function(error, stdout, stderr){
		console.log('stdout: ' + stdout);
		console.log('stderr: ' + stderr);
		if (error !== null) {
		  console.log('exec error: ' + error);
		}
	});

	// Allow 10-minute period for blockchain sync on testnet
	Promise.delay(600000).then(function(){
		return ethereumEnv.configureCoinbase();
	}).then(function(coinbase){
		console.log('Coinbase set on account: '+coinbase);
		return ethereumEnv.mine();
	}).then(function(mining){
		console.log('Ethereum node is mining');
	}).catch(function(error){
		console.log(error);
	});
}


Promise.delay(0).then(function(){
	return ethereumEnv.configureCoinbase();
}).then(function(coinbase){
	console.log('Coinbase set on account: '+coinbase);
	return ethereumEnv.mine();
}).then(function(mining){
	console.log('Ethereum node is mining');
}).catch(function(error){
	console.log(error);
});