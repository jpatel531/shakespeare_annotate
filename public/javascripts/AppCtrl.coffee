angular.module('Sonnets', []).controller 'AppCtrl', ($scope, $document) ->

	$scope.hello = "hi"



angular.module('Sonnets').directive 'annotate', ->

	{
		link: ($scope, el, attrs) ->
			el.annotator()
	}