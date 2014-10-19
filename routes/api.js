var express = require('express');
var router = express.Router();
var Sonnet = require('../models/sonnet');
var pusher = require('../pusherConfig')
// Pusher

/* GET home page. */

router.get('/sonnets-overview', function(req, res){
	Sonnet.find({}, {title: true, number: true}, function(err, sonnets){
		res.json(sonnets)
	});
});

router.get('/sonnets/:number', function(req, res){
	var number = parseInt(req.params.number)
	Sonnet.findOne({number: number}, function(err, sonnet){
		res.json(sonnet)
	});
});

router.get('/sonnets/:number/annotations', function(req, res){
	var number = req.params.number;
	Sonnet.findOne({number: number}, function(err, sonnet){
		res.json(sonnet.annotations)
	});
});

router.put('/sonnets/:number/annotations', function(req, res){
	var number = req.params.number;
	Sonnet.findOne({number: number}, function(err, sonnet){
		sonnet.annotations.push(req.body);
		sonnet.save(function(err, instance){
			pusher.trigger('annotations_channel', 'new_annotation', instance)
		});
	});

});

module.exports = router;