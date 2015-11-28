var net = require('net');
var path = require('path');
var fs = require('fs');
var Web3 = require('web3');
var config = require('../config/config');

if(process.argv[2] == 'docker'){
	var gethSocket = ('/root/.ethereum/geth.ipc');
} else {
	var gethSocket = ('/Users/ryan/Library/Ethereum/geth.ipc');
}


var ethpass = process.env.ethpass || "0af348c010952c176b49";

// Geth Socket Connection

var gethIPC = function(payload, next){
  if(payload == null){
    console.log('no payload');
    next('error');
  };

  var client = net.connect({path: gethSocket}, function() {
        client.end(JSON.stringify(payload));
  });

  client.on('connection', function(d){
    console.log(d)
  });

  client.on('data', function(data) {
    var response = "";
    response += data.toString();
    var res = JSON.parse(response);
      next(res)
  });

  client.on('end', function() {
      // console.log('Socket Received payload');
  });

  client.on('error', function(data){
    console.log(data);
  });

  process.on('SIGINT', function() {
      console.log("Caught interrupt signal");

      client.end();
      process.exit();
  });
};

exports.gethSocket = gethSocket;

exports.Personal = {
	newAccount : function(next){
		var payload = {jsonrpc: '2.0',method: 'personal_newAccount',params: [ethpass],id: 1};
		gethIPC(payload, function(data){
			next(data.error, data.result);
		});	
	},
	listAccounts : function(next){
		var payload = {jsonrpc: '2.0',method: 'personal_listAccounts',params: [],id: 1};
		gethIPC(payload, function(data){
			next(data.error, data.result);
		});
	},
	deleteAccount : function(address, password, next){
		var payload = {jsonrpc: '2.0',method: 'personal_deleteAccount',params: [address, ethpass],id: 1};
		gethIPC(payload, function(data){
			next(data.error, data.result);
		});	
	},
	unlockAccount : function(address, next){
		var duration = 120;
		console.log('Unlocking account '+address+' for '+duration+' seconds.');
		var payload = {jsonrpc: '2.0',method: 'personal_unlockAccount',params: [address, ethpass, duration],id: 1};
		gethIPC(payload, function(data){
			next(data.error, data.result);
		});
	}
};

exports.TxPool = {
	status : function(next){
		var payload = {jsonrpc: '2.0',method: 'txpool_status',params: [],id: 1};
		gethIPC(payload, function(data){
			next(data.error, data.result);
		});
	}
};

exports.Admin = {
	datadir : function(next){
		var payload = {jsonrpc: '2.0',method: 'admin_datadir',params: [],id: 1};
		gethIPC(payload, function(data){
			next(data.error, data.result);
		});
	},
	exportChain : function(file, next){
		var payload = {jsonrpc: '2.0',method: 'admin_exportChain',params: [file],id: 1};
		gethIPC(payload, function(data){
			next(data.error, data.result);
		});
	},
	chainSyncStatus : function(next){
		var payload = {jsonrpc: '2.0',method: 'admin_chainSyncStatus',params: [],id: 1};
		gethIPC(payload, function(data){
			console.log(data); //Have a feeling we could be getting an error here..
			next(data.error, data.result);
		});
	},
	verbosity : function(level, next){
		var payload = {jsonrpc: '2.0',method: 'admin_verbosity',params: [level],id: 1};
		gethIPC(payload, function(data){
			next(data.error, data.result);
		});
	},
	nodeInfo : function(next){
		var payload = {jsonrpc: '2.0',method: 'admin_nodeInfo',params: [],id: 1};
		gethIPC(payload, function(data){
			next(data.error, data.result);
		});	
	},
	addPeer : function(nodeUrl, next){
		var payload = {jsonrpc: '2.0',method: 'admin_addPeer',params: [nodeUrl],id: 1};
		gethIPC(payload, function(data){
			next(data.error, data.result);
		});
	},
	peers : function(next){
		var payload = {jsonrpc: '2.0',method: 'admin_addPeer',params: [nodeUrl],id: 1};
		gethIPC(payload, function(data){
			next(data.error, data.result);
		});
	},
	startNatSpec : function(next){
		var payload = {jsonrpc: '2.0',method: 'admin_startNatSpec',params: [],id: 1};
		gethIPC(payload, function(data){
			next(data.error, data.result);
		});	
	},
	getContractInfo : function(address, next){
		var payload = {jsonrpc: '2.0',method: 'admin_getContractInfo',params: [address],id: 1};
		gethIPC(payload, function(data){
			next(data.error, data.result);
		});
	},
	saveInfo : function(contractInfo, filename, next){
		var payload = {jsonrpc: '2.0',method: 'admin_getContractInfo',params: [contractInfo, filename],id: 1};
		gethIPC(payload, function(data){
			next(data.error, data.result);
		});	
	},
	register : function(address, contractaddress, contenthash, next){
		var payload = {jsonrpc: '2.0',method: 'admin_register',params: [address, contractaddress, contenthash],id: 1};
		gethIPC(payload, function(data){
			next(data.error, data.result);
		});	
	},
	registerUrl : function(address, codehash, contenthash, next){
		var payload = {jsonrpc: '2.0',method: 'admin_register',params: [address, codehash, contenthash],id: 1};
		gethIPC(payload, function(data){
			next(data.error, data.result);
		});
	}
};

exports.Miner = {
	start : function(threadCount, next){
		var payload = {jsonrpc: '2.0',method: 'miner_start',params: [threadCount],id: 1};
		gethIPC(payload, function(data){
			next(data.error, data.result);
		});
	},
	stop : function(threadCount, next){
		var payload = {jsonrpc: '2.0',method: 'miner_stop',params: [threadCount],id: 1};
		gethIPC(payload, function(data){
			next(data.error, data.result);
		});
	},
	startAutoDAG : function(next){
		var payload = {jsonrpc: '2.0',method: 'miner_startAutoDAG',params: [],id: 1};
		gethIPC(payload, function(data){
			next(data.error, data.result);
		});
	},
	stopAutoDAG : function(next){
		var payload = {jsonrpc: '2.0',method: 'miner_stopAutoDAG',params: [],id: 1};
		gethIPC(payload, function(data){
			next(data.error, data.result);
		});
	},
	makeDAG : function(blockNumber, dir, next){
		var payload = {jsonrpc: '2.0',method: 'miner_makeDAG',params: [blockNumber, dir],id: 1};
		gethIPC(payload, function(data){
			next(data.error, data.result);
		});
	},
	hashrate : function(next){
		var payload = {jsonrpc: '2.0',method: 'miner_hashrate',params: [],id: 1};
		gethIPC(payload, function(data){
			next(data.error, data.result);
		});
	},
	setExtra : function(next){ // Set Extra Block data to include 'VΞX'
		var payload = {jsonrpc: '2.0',method: 'miner_setExtra',params: ["VΞNTURΞ ΞQUITY ΞXCHANGΞ"],id: 1};
		gethIPC(payload, function(data){
			next(data.error, data.result);
		});	
	},
	setGasPrice : function(gasPrice, next){
		var payload = {jsonrpc: '2.0',method: 'miner_setGasPrice',params: [gasPrice],id: 1};
		gethIPC(payload, function(data){
			next(data.error, data.result);
		});
	},
	setEtherbase : function(account, next){
		var payload = {jsonrpc: '2.0',method: 'miner_setEtherbase',params: [account],id: 1};
		gethIPC(payload, function(data){
			next(data.error, data.result);
		});
	}
}

exports.Debug = {
	setHead : function(blockNumber, next){
		var payload = {jsonrpc: '2.0',method: 'debug_setHead',params: [blockNumber],id: 1};
		gethIPC(payload, function(data){
			next(data.error, data.result);
		});
	},
	seedHash : function(blockNumber, next){
		var payload = {jsonrpc: '2.0',method: 'debug_seedHash',params: [blockNumber],id: 1};
		gethIPC(payload, function(data){
			next(data.error, data.result);
		});
	},
	processBlock : function(blockNumber, next){
		var payload = {jsonrpc: '2.0',method: 'debug_processBlock',params: [blockNumber],id: 1};
		gethIPC(payload, function(data){
			next(data.error, data.result);
		});
	},
	getBlockRlp : function(blockNumber, next){
		var payload = {jsonrpc: '2.0',method: 'debug_getBlockRlp',params: [blockNumber],id: 1};
		gethIPC(payload, function(data){
			next(data.error, data.result);
		});
	},
	printBlock : function(blockNumber, next){
		var payload = {jsonrpc: '2.0',method: 'debug_printBlock',params: [blockNumber],id: 1};
		gethIPC(payload, function(data){
			next(data.error, data.result);
		});
	},
	dumpBlock : function(blockNumber, next){
		var payload = {jsonrpc: '2.0',method: 'debug_dumpBlock',params: [blockNumber],id: 1};
		gethIPC(payload, function(data){
			next(data.error, data.result);
		});
	},
	metrics : function(raw, next){
		var payload = {jsonrpc: '2.0',method: 'debug_metrics',params: [raw],id: 1};
		gethIPC(payload, function(data){
			next(data.error, data.result);
		});
	}
};

exports.loadScript = function(filePath, next){
	var payload = {jsonrpc: '2.0',method: 'loadScript',params: [filePath],id: 1};
	gethIPC(payload, function(data){
		next(data.error, data.result);
	});
};

exports.sleep = function(seconds, next){
	var payload = {jsonrpc: '2.0',method: 'sleep',params: [seconds],id: 1};
	gethIPC(payload, function(data){
		next(data.error, data.result);
	});
};

