var mongoose = require('mongoose');
var annotationSchema = require('./annotation')

var sonnetSchema = mongoose.Schema({
	title: String,
	text: Array,
	number: Number,
	annotations: [annotationSchema]
});

var Sonnet = mongoose.model('Sonnet', sonnetSchema);

module.exports = Sonnet;
