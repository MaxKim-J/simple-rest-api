var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index.html')
});
router.get('/about', function (req, res, next) {
  res.render('about.html')
});

module.exports = router;