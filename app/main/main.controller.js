var net = require('net');
var Ethereum = require('../../ethereum');
var Web3 = require('web3');
var web3 = new Web3();


exports.index = function(req, res, next){
	res.render('index', { title : 'vex', name : 'Ryan'});
}