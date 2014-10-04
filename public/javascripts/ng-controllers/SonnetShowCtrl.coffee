angular.module('Sonnets').controller 'SonnetShowCtrl', ($scope, $document, $http, Pusher, $location, AnnotationCategories) ->

	sonnetId = /sonnets\/(\d+)/.exec($location.absUrl())[1]

	$http.get("/api/sonnets/#{sonnetId}").success (data)->
		$scope.poem = data
		$scope.annotations = $scope.poem.annotations

	Pusher.subscribe 'annotations_channel', 'new_annotation', (poem)->
		$scope.$apply -> 
			$scope.annotations = poem.annotations


	$scope.submitAnnotation = (e)->
		if e.keyCode is 13
			$http.put("/api/sonnets/#{sonnetId}/annotations", $scope.annotation)
			$scope.annotation = null

	$scope.categories = AnnotationCategories