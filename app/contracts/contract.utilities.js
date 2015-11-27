var net = require('net');
var solc = require('solc');
var Promise = require('bluebird');
var Contract = require('./contract.model');
var path = require('path');
var contractsFolder = path.normalize(__dirname+'/turing_contracts');
var fs = Promise.promisifyAll(require('fs'));
var Ethereum = require('../../ethereum');
var ethpass = process.env.ethpass;
var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new web3.providers.IpcProvider(Ethereum.gethSocket, net));

function createAccount(){
	return new Promise(function(resolve, reject){
		Ethereum.Personal.newAccount(function(account){
			if(!account){reject(account)}
			Ethereum.Miner.setEtherbase(account, function(set){
				if(set != null) {reject(set);}
				resolve(account);
			});
		});
	});
}

function configureCoinbase(){
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

setTimeout(function(){
	configureCoinbase().then(function(coinbase){
		console.log('Coinbase set on account: '+coinbase);
	}).catch(function(error){
		console.log(error);
	});
}, 10000);

function unlock(){
	var Account;
	return new Promise(function(resolve, reject){
		Web3.eth.getCoinbase(function(err, account){
			if(err){reject(err)}
			Account = account;
			Ethereum.Personal.unlockAccount(account, function(unlocked){
				console.log('Account Unlocked: '+unlocked);
				resolve(Account);
			});
		});
	});
}

function compile(contract){
	return new Promise(function(resolve, reject){
		fs.readFileAsync(contractsFolder+contract, 'utf8').then(function(contract){
			
			var output = solc.compile(contract, 1);
			if(output.errors){reject(output);}
			resolve(output);
		}).catch(function(error){
			reject(error);
		});
	});
}

function deploy(contract){
	var Account;
	return new Promise(function(resolve, reject){
		unlock().then(function(account){
			Account = account;
			return compile(contract);
		}).then(function(compiled){
			var c = (Object.keys(compiled.contracts))[0];

			var ABI = compiled.contracts[c].interface;
			var CODE = compiled.contracts[c].bytecode;

			var Instance = Ethereum.web3.eth.contract(ABI);

			Instance.new({from: Account, data: CODE, gas: 1000000}, function(err, contract){
				if(err){reject(err);}
				if(!contract.address){
					console.log('Waiting for contract transaction '+contract.transactionHash+' to be mined...');
				} else {
					console.log('Contract mined! Contract Address: '+contract.address);
					Contract.createAsync({
						txHash : contract.transactionHash,
						address : contract.address,
						abi : contract.abi,
						account : Account
					}).then(function(contract){
						resolve(contract);
					}).catch(function(error){
						reject(error);
					});
				}
			});
		}).catch(function(error){
			reject(error);
		});
	})
}


exports.compile = compile;
exports.deploy = deploy;