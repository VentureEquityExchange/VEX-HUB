var express = require('express'),
  router = express.Router(),
  controller = require('./account.controller');

module.exports = function(app){
	app.use('/api/account', router);
};

router.get('/balance', controller.balance);

exports.router = router;