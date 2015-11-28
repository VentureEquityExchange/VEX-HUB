var net = require('net');
var Ethereum = require('../../ethereum');
var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new web3.providers.IpcProvider(Ethereum.gethSocket, net));

exports.balance = function(req, res, next){
	web3.eth.getCoinbase(function(err, coinbase){
		if(err){res.status(500).send(err)}
		web3.eth.getBalance(coinbase, function(err, balance){
			if(err){res.status(500).send(err)}
			res.status(200).send(balance);
		});
	});
}