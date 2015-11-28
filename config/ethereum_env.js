var net = require('net');
var Ethereum = require('../ethereum');
var Promise = require('bluebird');
var Web3 = require('web3');
var web3 = new Web3();


function mine(){
	return new Promise(function(resolve, reject){
		Ethereum.Miner.start(1, function(error, mining){
			if(error){reject(error)};
			resolve(mining);
		})
	})
}

function createAccount(){
	return new Promise(function(resolve, reject){
		Ethereum.Personal.newAccount(function(error, account){
			if(error){reject(error)}
			Ethereum.Miner.setEtherbase(account, function(set){
				if(set != null) {reject(set);}
				resolve(account);
			});
		});
	});
}

function configureCoinbase(){
	web3.setProvider(new web3.providers.IpcProvider(Ethereum.gethSocket, net));
	return new Promise(function(resolve, reject){
		web3.eth.getCoinbase(function(err, account){
			if(err){reject(err);}
			if(account == null){
				createAccount().then(function(account){
					resolve(account);
				}).catch(function(error){
					if(error){reject(error);}
				});
			} else {
				resolve(account);
			}
		});	
	})
	
}


exports.configureCoinbase = configureCoinbase;
exports.mine = mine;