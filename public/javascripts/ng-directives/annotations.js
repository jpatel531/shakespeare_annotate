// Generated by CoffeeScript 1.8.0
angular.module('Sonnets').directive('annotations', function() {
  return {
    restrict: 'A',
    link: function($scope, element, attrs) {
      return element.bind('mouseenter', function() {
        return $scope.$apply(function() {
          return $scope.$parent.selectedLine = attrs.lineNumber;
        });
      });
    }
  };
});
