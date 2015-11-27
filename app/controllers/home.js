var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  //Article = mongoose.model('Article');
  Contract = mongoose.model('Contract');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  Article.find(function (err, articles) {
    if (err) return next(err);
    res.render('index', {
      title: 'Generator-Express MVC',
      articles: articles
    });
  });
});
