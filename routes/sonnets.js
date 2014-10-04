var express = require('express');
var router = express.Router();
var Sonnet = require('../models/sonnet');

/* GET home page. */

router.get('/:number', function(req, res) {
	res.render('sonnet');	
});

module.exports = router;