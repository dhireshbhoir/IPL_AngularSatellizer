/**
 * navbar controller
 */
  app.controller('NavbarCotroller', function($scope, $auth) {
        $scope.isAuthenticated = function() {
            $scope.myUser=localStorage.userId;
            return $auth.isAuthenticated();
        };
    });
