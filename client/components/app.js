angular.module('planetside')
    .component('app', {
        controller: function() {
            this.players = [];
            this.logs = [];

            this.fetch = () => {    
                if (this.players.length) {
                    // let stringed = JSON.stringify(this.players);
                    $.ajax({
                        type: "get",
                        url: '/deaths',
                        // headers: {charid: stringed},
                        success: (eventData) => {
                            this.logs = eventData;
                            console.log(this.logs)
                        }
                    })
                }
            }
            this.fetchPush = (input) => {
                this.players.push(input);
                this.fetch(); 
            }
            this.addPlayer = () => {
                if (this.searchQuery.length){
                    if (this.searchQuery.length === 19 && !this.players.includes(this.searchQuery)) {
                        console.log('is player id')
                        this.fetchPush(`${this.searchQuery}`)
                    } else {
                        $.ajax({
                            type: "POST",
                            url: '/lookup',
                            data: this.searchQuery,
                            dataType: "text",
                            success: (charID) => {
                                if (!this.players.includes(charID) && charID !== '') {
                                    this.fetchPush(charID);
                                    console.log(charID)
                            }
                        }, 
                        fail: () => {
                            console.log('did not work')
                        }
                    });
                }
                }
            }
            this.removePlayer = () => {
                $.ajax({
                    type: "POST",
                    url: '/remove',
                    data: this.searchQuery,
                    dataType: "text",
                    success: (response) => {
                        console.log('removed from list')
                        const index =this.players.indexOf(this.searchQuery)
                        this.players.splice(index, 1);
                    }
                })
            }
            setInterval(this.fetch, 5000)
        },
        
        templateUrl: 'templates/app.html'
    });