// Generated by CoffeeScript 1.8.0
var app;

app = angular.module('Sonnets', ['ngSanitize', 'ui.bootstrap', 'doowb.angular-pusher']);

app.config([
  'PusherServiceProvider', function(PusherServiceProvider) {
    return PusherServiceProvider.setToken('8dd714bf0a643abe835e').setOptions({});
  }
]);

app.controller('AppCtrl', function($scope, $document, $http, Pusher, $location) {
  var routeParam;
  routeParam = /sonnets\/(\d+)/.exec($location.absUrl())[1];
  $http.get("/api/sonnets/" + routeParam).success(function(data) {
    return $scope.poem = data;
  });
  Pusher.subscribe('annotations_channel', 'new_annotation', function(annotation) {
    return $scope.annotations.push(annotation);
  });
  $http.get('/annotations').success(function(data) {
    return $scope.annotations = data;
  });
  $scope.submitAnnotation = function(e) {
    if (e.keyCode === 13) {
      $http.post('/annotations', $scope.annotation);
      return $scope.resetSelection();
    }
  };
  $scope.resetSelection = function() {
    $scope.annotation = null;
    return $scope.showPanel = false;
  };
  return $scope.categories = ["Glossing", "Analysis", "Textual Variants", "Sources", "Scansion", "Early Modern Language", "Historical Context", "Rhetorical Tropes", "Reception", "Performance"];
});

app.directive('annotate', function() {
  return {
    scope: {
      lineNumber: '@'
    },
    link: function($scope, el, attrs) {
      return el.bind('click', function() {
        var lineNumber, selection;
        lineNumber = angular.element(window.getSelection().baseNode.parentElement)[0].getAttribute('line-number');
        selection = window.getSelection().toString();
        if (selection !== "") {
          return $scope.$apply(function() {
            $scope.$parent.showPanel = true;
            return $scope.$parent.annotation = {
              quote: selection,
              lineNumber: lineNumber
            };
          });
        }
      });
    }
  };
});

app.directive('annotations', function($compile) {
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

app.filter('byLine', function() {
  return function(annotations, lineNumber) {
    return _.where(annotations, {
      lineNumber: lineNumber
    });
  };
});
