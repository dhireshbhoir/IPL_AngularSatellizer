/**
 * Login controller
 */
app.controller('LoginController', function($scope, $auth, $state) {

    /*Regex format for password*/
    $scope.password_pattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

    /**
     * function to login
     */
    $scope.login = function() {
        var user = {
            emailId: $scope.email,
            password: $scope.Password
        };

        /**
         *POST call for login page
         */
        var config = {
            method: 'POST',
            url: 'http://192.168.0.31:3000/login'
        }
        console.log($scope.email + "          " + $scope.Password);

        $auth.login(user, config) //http config object
            .then(function() {

                // Redirect user here after a successful log in.
                console.log('You have successfully signed in!');
                localStorage.userId = user.emailId;
                console.log("Inside Loginctr");
                $state.go('teams');

            }).catch(function(error) {
                console.log(error);
                if (error.status == "401") {

                // Handle errors here, such as displaying a notification
                    alert('Wrong email and password');
                }
            });
    }
});
