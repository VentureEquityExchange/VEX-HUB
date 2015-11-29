var express = require('express'),
  router = express.Router(),
  controller = require('./directorate.controller');

module.exports = function(app){
	app.use('/api/directorate', router);
};

router.get('/contracts', controller.contracts);

exports.router = router;