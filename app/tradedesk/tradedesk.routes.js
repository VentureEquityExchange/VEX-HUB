var express = require('express'),
  router = express.Router(),
  controller = require('./tradedesk.controller');

module.exports = function(app){
	app.use('/api/tradedesk', router);
};

router.get('/contracts', controller.contracts);

exports.router = router;