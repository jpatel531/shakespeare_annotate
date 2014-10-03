app = angular.module('Sonnets', ['ngSanitize', 'ui.bootstrap', 'doowb.angular-pusher'])

app.config ['PusherServiceProvider',
	(PusherServiceProvider) ->
		PusherServiceProvider
		.setToken('8dd714bf0a643abe835e')
		.setOptions({});
]

app.controller 'AppCtrl', ($scope, $document, $http, Pusher) ->

	Pusher.subscribe 'annotations_channel', 'new_annotation', (annotation)->
		$scope.annotations.push annotation
		console.log $scope.annotations


	$http.get('/annotations').success (data) ->
		$scope.annotations = data

	$scope.poem = ["From fairest creatures we desire increase, ", "That thereby beauty's rose might never die, ", "But as the riper should by time decease, ", "His tender heir might bear his memory:", "But thou, contracted to thine own bright eyes,", "Feed'st thy light's flame with self-substantial fuel,", "Making a famine where abundance lies, ", "Thyself thy foe, to thy sweet self too cruel.", "Thou that art now the world's fresh ornament ", "And only herald to the gaudy spring, ", "Within thine own bud buriest thy content ", "And, tender churl, makest waste in niggarding. ", "Pity the world, or else this glutton be, ", "To eat the world's due, by the grave and thee."] 

	$scope.submitAnnotation = (e)->
		if e.keyCode is 13
			$http.post('/annotations', $scope.annotation)
			$scope.resetSelection()

	$scope.resetSelection = -> 
		$scope.annotation = null
		$scope.showPanel = false

app.directive 'annotate', ->

	{		
		scope: {lineNumber: '@'}
		link: ($scope, el, attrs) ->
			el.bind 'click', ->
				lineNumber =  angular.element(window.getSelection().baseNode.parentElement)[0].getAttribute('line-number')
				console.log lineNumber
				selection = window.getSelection().toString()
				if selection isnt "" 
					$scope.$apply -> 
						$scope.$parent.showPanel = true
						$scope.$parent.annotation = {
							quote: selection, 
							lineNumber: lineNumber,
						}
	}

app.directive 'annotations', ($compile) ->

	{
		restrict: 'A',
		link: ($scope, element, attrs) ->
			$scope.$parent.$watch 'annotations', (->
				_.each $scope.$parent.annotations, (annotation) ->
					if parseInt(attrs.lineNumber) is parseInt(annotation.lineNumber)
						html = ($scope.$parent.poem[attrs.lineNumber - 1].replace annotation.quote, "<mark><span tooltip='#{annotation.text}'>#{annotation.quote}</span></mark>")
						e = $compile("<p line-number='#{attrs.lineNumber}'>" + html + "</p>")($scope)
						element.replaceWith e
			), true
	}
