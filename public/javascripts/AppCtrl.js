// Generated by CoffeeScript 1.8.0
angular.module('Sonnets', []).controller('AppCtrl', function($scope, $document, $http) {
  $http.get('/annotations').success(function(data) {
    return $scope.annotations = data;
  });
  $scope.hello = "hi";
  $scope.poem = ["From fairest creatures we desire increase, ", "That thereby beauty's rose might never die, ", "But as the riper should by time decease, ", "His tender heir might bear his memory:", "But thou, contracted to thine own bright eyes,", "Feed'st thy light's flame with self-substantial fuel,", "Making a famine where abundance lies, ", "Thyself thy foe, to thy sweet self too cruel.", "Thou that art now the world's fresh ornament ", "And only herald to the gaudy spring, ", "Within thine own bud buriest thy content ", "And, tender churl, makest waste in niggarding. ", "Pity the world, or else this glutton be, ", "To eat the world's due, by the grave and thee."];
  $scope.submitAnnotation = function(e) {
    if (e.keyCode === 13) {
      $http.post('/annotations', $scope.annotation);
      return $scope.resetSelection();
    }
  };
  return $scope.resetSelection = function() {
    $scope.annotation = null;
    return $scope.showPanel = false;
  };
});

angular.module('Sonnets').directive('annotate', function() {
  return {
    link: function($scope, el, attrs) {
      el.bind('hover', function() {});
      return el.bind('click', function() {
        var selection;
        selection = window.getSelection().toString();
        if (selection !== "") {
          return $scope.$apply(function() {
            $scope.$parent.showPanel = true;
            return $scope.$parent.annotation = {
              quote: selection,
              lineNumber: attrs.lineNumber
            };
          });
        }
      });
    }
  };
});
