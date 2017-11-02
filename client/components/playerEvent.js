angular.module('planetside')
	.component('playerEvent', {
		bindings: {
			log: '<'
		},
		templateUrl: 'templates/playerEvent.html'
	});