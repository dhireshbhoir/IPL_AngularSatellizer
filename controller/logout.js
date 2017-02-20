/**
 * Logout controller
 */
  app.controller('LogoutController', function($state, $auth) {
        if (!$auth.isAuthenticated()) { return; }
        $auth.logout()

        /* Delete a token from Local Storage (or Session Storage) */
            .then(function() {
                console.log('You have been logged out');
                localStorage.removeItem("userId");
                $state.go('login');
            });
    });
