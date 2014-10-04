angular.module('Sonnets').filter 'byLine', ->

	(annotations, lineNumber) ->
		_.where(annotations, {lineNumber: lineNumber})