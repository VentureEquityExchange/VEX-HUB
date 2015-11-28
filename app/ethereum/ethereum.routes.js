var express = require('express'),
  router = express.Router(),
  controller = require('./ethereum.controller');

module.exports = function(app){
	app.use('/api/ethereum', router);
};

// router.get('/syncstatus', controller.syncStatus);

exports.router = router;