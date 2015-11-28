

var express = require('express'),
  path = require('path');
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
var io = require('socket.io')(5445);
require('./config/socketio')(io);

require('./config/express')(app, config);

app.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});

//

var ExpressPeerServer = require('peer').ExpressPeerServer;
var options = { debug : true, proxied: false};
app.use('/peerjs', ExpressPeerServer(app, options));

/* Running Ethereum as Child Process execution */
console.log(process.argv[2] == 'docker');
if(process.argv[2] == 'docker'){
	console.log('Process is Dockerized.');
	console.log('Ethereum Node Starting...');
	Promise.delay(0).then(function(){
		var Geth = exec('geth --testnet --password '+config.ethpassFile+' account new', {maxBuffer: 1024*600}, function(error, stdout, stderr){
			console.log('stdout: ' + stdout);
			console.log('stderr: ' + stderr);
			if (error !== null) {
			  console.log('exec error: ' + error);
			}
		});
		return;
	}).delay(10000).then(function(){
		var Geth = exec('geth --testnet', {maxBuffer: 1024*600}, function(error, stdout, stderr){
			console.log('stdout: ' + stdout);
			console.log('stderr: ' + stderr);
			if (error !== null) {
			  console.log('exec error: ' + error);
			}
		});
		return;
	}).delay(1200000).then(function(){ // 20 minute delay to allow chain sync; possibly necessary....
		return ethereumEnv.configureCoinbase();
	}).then(function(coinbase){
		console.log('Coinbase set on account: '+coinbase);
		return ethereumEnv.mine();
	}).then(function(mining){
		console.log('Ethereum node is mining');
	}).catch(function(error){
		console.log(error);
	});
} else if(process.argv[2] == 'local'){
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
};