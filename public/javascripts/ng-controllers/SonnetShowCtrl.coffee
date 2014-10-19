angular.module('Sonnets').controller 'SonnetShowCtrl', ($scope, $document, $http, $pusher, $location, AnnotationCategories) ->

	client = new Pusher('8dd714bf0a643abe835e')

	pusher = $pusher client

	sonnetId = /sonnets\/(\d+)/.exec($location.absUrl())[1]

	$http.get("/api/sonnets/#{sonnetId}").success (data)->
		$scope.poem = data
		$scope.annotations = $scope.poem.annotations


	annotationsChannel = pusher.subscribe 'annotations_channel'

	annotationsChannel.bind 'new_annotation', (poem)->
		$scope.$apply -> 
			$scope.annotations = poem.annotations


	$scope.submitAnnotation = (e)->
		if e.keyCode is 13
			$http.put("/api/sonnets/#{sonnetId}/annotations", $scope.annotation)
			$scope.annotation = null

	$scope.categories = AnnotationCategories

	presenceChannel = pusher.subscribe 'presence-users'

	$scope.members = presenceChannel.members


