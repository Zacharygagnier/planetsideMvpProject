angular.module('planetside')
    .component('app', {
        controller: function() {
            this.players = [];
            this.logs = [];
            this.fetch = () => {
                if (this.players.length) {
                    let stringed = JSON.stringify(this.players);
                    $.ajax({
                        type: "get",
                        url: '/deaths',
                        headers: {charid: stringed},
                        success: (eventData) => {
                            const eventParsed = JSON.parse(eventData)
                            this.logs = eventParsed.characters_event_list;
                            console.log(this.logs);
                        }
                    })
                }
            }
            this.addPlayer = () => {
                if (this.searchQuery.length){
                    this.added = this.searchQuery
                    $.ajax({
                        type: "POST",
                        url: '/lookup',
                        data: this.added,
                        dataType: "text",
                        success: (data) => {
                            console.log(data)
                            if (this.players.indexOf(data) === -1 && data !== '') {
                                console.log(this.players)
                                this.players.push(data);
                                this.fetch();
                            }
                        },
                        fail: () => {
                            console.log('did not work')
                        }
                      });

                }
            }
        },
        templateUrl: 'templates/app.html'
    });