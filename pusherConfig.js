var secrets = require('./secrets');
var Pusher = require('pusher');

var pusher = new Pusher({
	appId: secrets.pusherAppId,
	key: secrets.pusherAppKey,
	secret: secrets.pusherSecret
});

module.exports = pusher