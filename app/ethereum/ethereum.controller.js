var net = require('net');
var Ethereum = require('../../ethereum');
var Web3 = require('web3');
var web3 = new Web3();




exports.syncStatus = function(req, res, next){
	web3.setProvider(new web3.providers.IpcProvider(Ethereum.gethSocket, net));
	// Method appears to be deprecated.
	Ethereum.Admin.chainSyncStatus(function(status){
		console.log(status);
		res.status(200).send({
			blocksAvailable : status.blocksAvailable, 
			blocksWaitingForImport : status.blocksWaitingForImport, 
			estimate : status.estimate, 
			importing : status.importing
		});
	});
}