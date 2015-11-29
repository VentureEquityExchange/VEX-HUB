var net = require('net');
var Ethereum = require('../../ethereum');
var Web3 = require('web3');
var web3 = new Web3();


exports.contracts = function(req, res, next){
	res.send('Should send directorate-focused source contracts');
}