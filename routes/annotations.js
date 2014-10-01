var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
	var annotations = [{quote: 'That thereby beauty\'s rose might never die', text: 'Good line', lineNumber: 2}]
	res.json(annotations)
});

router.post('/', function(req, res){
	console.log(req.body);
});

module.exports = router;