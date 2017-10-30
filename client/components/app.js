angular.module('planetside')
    .component('app', {
        controller: function(selection) {
            this.currentPlayers;
            this.killData;
        },
        templateUrl: 'templates/app.html'
    });