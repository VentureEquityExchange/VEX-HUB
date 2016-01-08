var express = require('express'),
  router = express.Router(),
  controller = require('./main.controller');

module.exports = function(app){
	app.use('/', router);
};

router.get('/', controller.index);

exports.router = router;