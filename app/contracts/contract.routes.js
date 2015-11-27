var express = require('express'),
  router = express.Router(),
  controller = require('./contract.controller');

module.exports = function(app){
	app.use('/api/contracts', router);
};

router.get('/', controller.get);
router.post('/deploy/:contract', controller.deploy);
router.post('/update', controller.update);

exports.router = router;