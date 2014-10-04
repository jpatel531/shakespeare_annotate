angular.module('Sonnets').directive 'annotations', ->

	{
		restrict: 'A',
		link: ($scope, element, attrs) ->

			element.bind 'mouseenter', ->
				$scope.$apply -> $scope.$parent.selectedLine = attrs.lineNumber

	}
