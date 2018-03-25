var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('VighteR Server');
});

module.exports = router;
