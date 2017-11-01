angular.module('planetside')
    .component('app', {
        controller: function() {
            this.logs = [];

            this.fetch = () => {    
              $.ajax({
                  type: "get",
                  url: '/deaths',
                  success: (eventData) => {
                      this.logs = eventData;
                  },
                  fail: (err) => {
                      console.error(err);
                  }
              })
            }
            // this.fetchPush = (input) => {
            //     this.players.push(input);
            //     this.fetch(); 
            // }
            this.addPlayer = () => {
                if (this.searchQuery.length){
                  $.ajax({
                      type: "POST",
                      url: '/lookup',
                      data: this.searchQuery,
                      dataType: "text",
                      success: (charID) => {
                              this.fetch();
                              console.log(charID)
                                }, 
                      fail: () => {
                          console.log('did not work')
                      }
                    })
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