angular.module('planetside')
    .component('app', {
        controller: function(queryServer) {
            this.killData;
            this.service = queryServer;
            this.addPlayer = () => {
                this.service.addAll(this.searchQuery, )
                this.added = '';
            }
        },
        templateUrl: 'templates/app.html'
    });