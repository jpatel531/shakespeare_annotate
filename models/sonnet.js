var mongoose = require('mongoose');

var sonnetSchema = mongoose.Schema({
	title: String,
	text: Array,
	number: Number
});

var Sonnet = mongoose.model('Sonnet', sonnetSchema);

module.exports = Sonnet;
