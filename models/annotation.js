var mongoose = require('mongoose');

var annotationSchema = mongoose.Schema({
	quote: String,
	text: String,
	lineNumber: String
});

var Annotation = mongoose.model('Annotation', annotationSchema);

module.exports = Annotation;
