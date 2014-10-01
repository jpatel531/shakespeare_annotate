angular.module('Sonnets', ['ngSanitize', 'ui.bootstrap']).controller 'AppCtrl', ($scope, $document, $http) ->

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

angular.module('Sonnets').directive 'annotate', ->

	{		link: ($scope, el, attrs) ->

			el.bind 'click', ->
				selection = window.getSelection().toString()
				if selection isnt "" 
					$scope.$apply -> 
						$scope.$parent.showPanel = true
						$scope.$parent.annotation = {
							quote: selection, 
							lineNumber: attrs.lineNumber,
						}
	}

angular.module('Sonnets').directive 'annotations', ($compile) ->

	{
		restrict: 'A',
		link: ($scope, element, attrs) ->
			$scope.$parent.$watch 'annotations', ->
				_.each $scope.$parent.annotations, (annotation) ->
					if parseInt(attrs.lineNumber) is parseInt(annotation.lineNumber)
						html = ($scope.$parent.poem[attrs.lineNumber - 1]
							.replace annotation.quote, "<a href='#' tooltip='#{annotation.text}'>#{annotation.quote}</a>")
						e = $compile("<p>" + html + "</p>")($scope);
						element.replaceWith e
	}
