var express = require('express');
var router = express.Router();
var Pusher = require('pusher');
var secrets = require('../secrets');

var Annotation = require('../models/annotation');


var pusher = new Pusher({
	appId: secrets.pusherAppId,
	key: secrets.pusherAppKey,
	secret: secrets.pusherSecret
});



router.get('/', function(req, res){
	var annotations = Annotation.find({}, function(err, annotations){
		res.json(annotations)
	});
});

router.post('/', function(req, res){
	var annotation = new Annotation(req.body);
	annotation.save(function(err, instance){
		pusher.trigger('annotations_channel', 'new_annotation', instance)
	});
});

module.exports = router;