angular.module('planetside')
    .component('app', {
        controller: function() {
            this.players = [];
            this.logs = [];
            this.interval;
            this.fetch = () => {
                if (this.players.length) {
                    let stringed = JSON.stringify(this.players);
                    $.ajax({
                        type: "get",
                        url: '/deaths',
                        headers: {charid: stringed},
                        success: (eventData) => {
                            console.log('refreshed data')
                            const eventParsed = JSON.parse(eventData)
                            this.logs = eventParsed.characters_event_list;
                        }
                    })
                }
            }
            this.fetchInterval = (input) => {
                clearInterval(this.interval)
                this.players.push(input);
                this.fetch();
                this.interval = setInterval(this.fetch, 5000);
            }
            this.addPlayer = () => {
                if (this.searchQuery.length){
                    if (this.searchQuery.length === 19) {
                        console.log('is player id')
                        // this.players.push(`${this.searchQuery}`)
                        this.fetchInterval(`${this.searchQuery}`)
                    } else {
                        this.added = this.searchQuery
                        $.ajax({
                            type: "POST",
                            url: '/lookup',
                            data: this.added,
                        dataType: "text",
                        success: (data) => {
                            if (this.players.indexOf(data) === -1 && data !== '') {
                                this.fetchInterval(data);
                                // clearInterval(this.interval)
                                // this.players.push(data);
                                // this.fetch();
                                // this.interval = setInterval(this.fetch, 5000);
                            }
                        }, 
                        fail: () => {
                            console.log('did not work')
                        }
                    });
                }

                }
            }
        },
        templateUrl: 'templates/app.html'
    });