var express = require('express');
var glob = require('glob');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');

module.exports = function(app, config) {
  var env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';
  
  app.set('views', config.root + '/app/views');
  app.set('view engine', 'jsx');
  app.engine('jsx', require('express-react-views').createEngine());

  // app.use(favicon(config.root + '/public/img/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser());
  app.use(compress());
  // app.use(express.static(config.root + '/angular-app'));
  app.use(methodOverride());
  app.use(require('prerender-node'));

  // API Routes
  require(config.root+'/app/main/main.routes')(app);
  require(config.root+'/app/contracts/contract.routes')(app);
  require(config.root+'/app/account/account.routes')(app);
  require(config.root+'/app/ethereum/ethereum.routes')(app);
  require(config.root+'/app/directorate/directorate.routes')(app);

  /*
  var controllers = glob.sync(config.root + '/app/controllers/*.js');
  controllers.forEach(function (controller) {
    require(controller)(app);
  });
  */

  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  if(app.get('env') === 'development'){
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.send('error');
    });
  }

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
      res.send('error');
  });

};
