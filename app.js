/**
 * FileName:app.js
 * CreatedBy: Dhiresh Bhoir
 * purpose : perform routing according to state
 */

/**
 * @define module
 * @param {string} ngApp - parameter refers to the HTML element in which app will run
 * @param {Array} injector - loading modules through injector
 * */

app=angular.module('app', ['ui.router','firebase','satellizer']);

/** configure existing services */
app.config(function($stateProvider, $urlRouterProvider) {

  /**
    * @promise Get user from database.
    * @resolve {object} user information
    * @reject {Error} validation error, connection error
    */
  var skipIfLoggedIn = ['$q', '$auth', function($q, $auth) {
            var deferred = $q.defer();
            if ($auth.isAuthenticated()) {
                deferred.reject();
            } else {
                deferred.resolve();
            }
            return deferred.promise;
        }];//end of function

        var loginRequired = ['$q', '$state', '$auth', function($q, $state, $auth) {
            var deferred = $q.defer();
            if ($auth.isAuthenticated()) {
                deferred.resolve();
            } else {
                $state.go('login');
            }
            return deferred.promise;
        }];//end of function

        /**
        * @default home
        */
          $urlRouterProvider.otherwise('/login');

        /** @define states */
        $stateProvider

        /* configure login state */
         .state('login', {
                url: '/login',
                controller:'LoginController',
                templateUrl: './template/login.html',
                resolve: {
                    skipIfLoggedIn: skipIfLoggedIn
                }
            })

            /* configure teams state */
            .state('teams', {
                url: '/teams',
                controller: 'TeamsDataController',
                templateUrl: './template/teams.html',
                resolve: {
                    loginRequired: loginRequired // loginRequired function will check for token
                }
            })

            /* configure players state */
            .state("teams.show", {
                url: "/id:id"
            })

            /* configure logout state */
            .state('logout', {
                url: '/logout',
                controller:'LogoutController',
                template: null,
                resolve: {
                    loginRequired: loginRequired // loginRequired function will check for token
                }
            });
    })
