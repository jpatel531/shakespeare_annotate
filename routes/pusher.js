var express = require('express');
var router = express.Router();

var pusher = require('../pusherConfig.js')

/* GET home page. */

router.post('/auth', function(req, res) {
	var socketId = req.body.socket_id;
	var channel = req.body.channel_name;
	var presenceData = {user_id: 1, hello: "hi"}
	var auth = pusher.authenticate(socketId, channel, presenceData);
	res.json(auth);
});

module.exports = router;