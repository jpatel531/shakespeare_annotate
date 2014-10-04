app = angular.module('Sonnets', ['ngSanitize', 'ui.bootstrap', 'doowb.angular-pusher'])

app.config ['PusherServiceProvider',
	(PusherServiceProvider) ->
		PusherServiceProvider
		.setToken('8dd714bf0a643abe835e')
		.setOptions({});
]