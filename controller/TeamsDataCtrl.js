/**
 * Teams controller
 */

app.controller('TeamsDataController', function($scope, $http, $state, firebaseRead,$timeout) {
    console.log("Start");
var items=[];
    function myPromise() {
      return new Promise(function (resolve, reject) {
             firebaseRead.getDatabase(function(database){
             items=database;
             $timeout(function(){$scope.teams=items;},1000);
             resolve();
          })
          });
      }
      myPromise();

    /**
     * @function teamPlayers - Displaying players in modal
     * @param {String} id - team id
     */

      $scope.teamPlayers = function(id) {
      $scope.players=items[id];

        //calling teams.show state
        $state.go('teams.show', {
            id: id
        });
    }
});
