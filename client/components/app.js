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
                            console.log(this.players, this.logs)
                        }
                    })
                }
            }
            this.fetchInterval = (input) => {
                this.players.push(input);
                this.fetch(); 
            }
            this.addPlayer = () => {
                if (this.searchQuery.length){
                    if (this.searchQuery.length === 19 && !this.players.includes(this.searchQuery)) {
                        console.log('is player id')
                        // this.players.push(`${this.searchQuery}`)
                        this.fetchInterval(`${this.searchQuery}`)
                    } else {
                        $.ajax({
                            type: "POST",
                            url: '/lookup',
                            data: this.searchQuery,
                        dataType: "text",
                        success: (charID) => {
                            if (!this.players.includes(charID) && charID !== '') {
                                this.fetchInterval(charID);
                            }
                        }, 
                        fail: () => {
                            console.log('did not work')
                        }
                    });
                }

                }
            }
            setInterval(this.fetch, 5000)
        },
        
        templateUrl: 'templates/app.html'
    });