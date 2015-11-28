var net = require('net');
var solc = require('solc');
var Promise = require('bluebird');
var mongoose = require('mongoose');
var Contract = mongoose.model('Contract');
var path = require('path');
var contractsFolder = path.normalize(__dirname+'/turing_contracts/');
var fs = Promise.promisifyAll(require('fs'));
var Ethereum = require('../../ethereum');
var ethpass = process.env.ethpass;
var Web3 = require('web3');
var web3 = new Web3();

// web3.setProvider(new web3.providers.HttpProvider("http://localhost:8545"));
// web3.setProvider(new web3.providers.IpcProvider(Ethereum.gethSocket, net));

function unlock(){
	web3.setProvider(new web3.providers.IpcProvider(Ethereum.gethSocket, net));
	return new Promise(function(resolve, reject){
		web3.eth.getCoinbase(function(err, account){
			if(err){reject(err)}
			web3.eth.defaultAccount = account;
			Ethereum.Personal.unlockAccount(account, function(error, unlocked){
				if(error){reject(error)};
				console.log('Account, '+account+', unlocked: '+unlocked);
				resolve(account);
			});
		});
	});
}


function compileContract(contract){
	return new Promise(function(resolve, reject){
		fs.readFileAsync(contractsFolder+contract, 'utf8').then(function(c){
			var output = solc.compile(c, 1);
			if(output.errors){reject(output);}
			resolve(output);
		}).catch(function(error){
			reject(error);
		});
	});
}

function deploy(contract){
	return new Promise(function(resolve, reject){
		unlock().then(function(account){
			web3.eth.defaultAccount = account;
			return compileContract(contract);
		}).then(function(comp){
			web3.setProvider(new web3.providers.HttpProvider("http://localhost:8545"));
			var c = (Object.keys(comp.contracts))[0];
			var abi = JSON.parse(comp.contracts[c].interface); // Always use JSON.parse().
			var code = comp.contracts[c].bytecode;

			console.log(comp);
			
			web3.eth.contract(abi).new({data: code, gas : 1000000}, 
				function(error, deployed){
				if(error) throw error; // should get caught below..
				if(!deployed.address){
					console.log('Waiting for contract transaction '+deployed.transactionHash+' to be mined...');
				} else {
					console.log('Contract mined! Contract Address: '+deployed.address);
					var C = new Contract();
					C.name = contract;
					C.deployed = deployed;
					C.account = web3.eth.defaultAccount;
					C.save(function(err, saved){
						if(err){reject(err);}
						resolve(saved);
					});
				}
			});

		}).catch(function(error){
			console.log(error);
			reject(error);
		});
	})
}

function add(contract){
	return new Promise(function(resolve, reject){
		fs.writeFileAsync(contractsFolder+contract, 'utf8').then(function(file){
			resolve(file);
		}).catch(function(error){
			reject(error);
		});
	})
}

exports.unlock = unlock;
exports.compileContract = compileContract;
exports.deploy = deploy;
exports.add = add;