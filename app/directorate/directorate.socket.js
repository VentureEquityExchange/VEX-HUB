var Contract = require('../contracts/contract.model');
var Utilities = require('./directorate.utils');

module.exports = function(socket){
	socket.on('directorate_contracts', function(){
		Utilities.getContracts().then(function(contracts){
			socket.emit('directorate_contracts', contracts);
		}).catch(function(error){
			console.log(error);
		});
	});

	socket.on('registrar', function(){
		Contract.findOne({name : 'registration.sol'}, function(err, contract){
			if(err) console.log(err);
			socket.emit('registration.sol', contract);
		});		
	});
	
	socket.on('directorate_nodeInfo', function(data){
		// Handle the data here via some utility function; e.g. store in db..
		// on connection of a desktop node, receive node details; possible add node as a peer to the node list.
		
		console.log('Peer Connected: '+data);
	});
}