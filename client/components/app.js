angular.module('planetside')

    .component('app', {
        controller: function($interval) {
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
                    }
                })
            }
            $interval(this.fetch, 3000)
        },
        
        templateUrl: 'templates/app.html'
    });

    // app.factory('getEvents', ($http, $q) => {

    // })