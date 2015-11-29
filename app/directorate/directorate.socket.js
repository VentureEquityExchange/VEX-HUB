var Contract = require('../contracts/contract.model');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));

module.exports = function(socket){
	Contract.findOne({name : 'registration.sol'}, function(err, contracts){
		if(err) console.log(err);
		socket.emit('directorate_contracts', contracts);
	});

	
	socket.on('directorate_nodeInfo', function(data){
		// Handle the data here via some utility function; e.g. store in db..
		// on connection of a desktop node, receive node details; possible add node as a peer to the node list.
		
		console.log('Peer Connected: '+data);
	});
}