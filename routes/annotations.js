var express = require('express');
var router = express.Router();
var Annotation = require('../models/annotation')

router.get('/', function(req, res){
	var annotations = Annotation.find({}, function(err, annotations){
		res.json(annotations)
	});
});

router.post('/', function(req, res){
	// console.log(req.body);
	var annotation = new Annotation(req.body);
	annotation.save(function(err, instance){
		console.log(instance);
	});
});

module.exports = router;