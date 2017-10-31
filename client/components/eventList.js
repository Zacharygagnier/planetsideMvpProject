angular.module('planetside')
.component('eventList', {
    bindings: {
        logs: '<'
    },
    templateUrl: 'templates/eventList.html'
});