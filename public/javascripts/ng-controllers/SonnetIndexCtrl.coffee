angular.module('Sonnets').controller 'SonnetIndexCtrl', ($http, $scope)->

	$http.get('/api/sonnets-overview').success (data) ->
		$scope.sonnets = data