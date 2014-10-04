angular.module('Sonnets').directive 'annotate', ->

	{		
		scope: {lineNumber: '@'}
		link: ($scope, el, attrs) ->
			el.bind 'click', ->
				lineNumber =  angular.element(window.getSelection().baseNode.parentElement)[0].getAttribute('line-number')
				selection = window.getSelection().toString()
				if selection isnt "" 
					$scope.$apply -> 
						$scope.$parent.showPanel = true
						$scope.$parent.annotation = {
							quote: selection, 
							lineNumber: lineNumber,
						}
	}