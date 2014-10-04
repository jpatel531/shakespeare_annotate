var express = require('express');
var router = express.Router();
var Sonnet = require('../models/sonnet');

/* GET home page. */

router.get('/sonnets/:number', function(req, res){
	var number = parseInt(req.params.number)
	var sonnet = Sonnet.findOne({number: number}, function(err, sonnet){
		res.json(sonnet)
	});
});

router.get('/sonnets/:number/annotations', function(req, res){
	var annotations = Anno
});

module.exports = router;