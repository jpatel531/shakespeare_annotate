var express = require('express');
var router = express.Router();
var Sonnet = require('../models/sonnet');
var Pusher = require('pusher');
var secrets = require('../secrets');

// Pusher

var pusher = new Pusher({
	appId: secrets.pusherAppId,
	key: secrets.pusherAppKey,
	secret: secrets.pusherSecret
});

/* GET home page. */

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