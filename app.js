(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngCookies'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                controller: 'HomeController',
                templateUrl: 'home/home.view.html',
                controllerAs: 'vm'
            })
			
			.when('/finan', {
                controller: 'FinanController',
                templateUrl: 'finan/finan.view.html',
                controllerAs: 'vm'
            })

			.when('/partners', {
                controller: 'PartnersController',
                templateUrl: 'partners/partners.view.html',
                controllerAs: 'vm'
            })
			
			.when('/services', {
                controller: 'ServicesController',
                templateUrl: 'services/services.view.html',
                controllerAs: 'vm'
            })			

			.when('/account', {
                controller: 'AccountController',
                templateUrl: 'account/account.view.html',
                controllerAs: 'vm'
            })	
			
			.when('/about', {
                controller: 'AboutController',
                templateUrl: 'about/about.view.html',
                controllerAs: 'vm'
            })
			
            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'login/login.view.html',
                controllerAs: 'vm'
            })

            .when('/register', {
                controller: 'RegisterController',
                templateUrl: 'register/register.view.html',
                controllerAs: 'vm'
            })

            .otherwise({ redirectTo: '/login' });
    }

    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
    function run($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }

})();