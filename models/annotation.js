var mongoose = require('mongoose');

var annotationSchema = mongoose.Schema({
	quote: String,
	text: String,
	lineNumber: String,
	category: String
});

module.exports = annotationSchema;
