var Contract = require('../contracts/contract.model');

module.exports = function(io){
	io.on('connection', function(socket){
		
		Contract.find({}, function(err, contracts){
			if(err) console.log(err);
			socket.emit('contracts', contracts);
		});

		
		socket.on('directorate_nodeInfo', function(data){
			// Handle the data here via some utility function; e.g. store in db..
			// on connection of a desktop node, receive node details; possible add node as a peer to the node list.
			
			console.log('Peer Connected: '+data);
		});


	});
}