'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'ui.map'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/result', {
      templateUrl: 'partials/result',
      controller: 'ResultsCtrl'
    }).
    when('/gps', {
          templateUrl: 'partials/gps',
          controller: 'GpsCtrl'
    }).
    when('/adresse', {
      templateUrl: 'partials/adresse'
    }).
    otherwise({
      redirectTo: '/gps'
    });

  $locationProvider.html5Mode(true);
})
    .run(function($rootScope){
        $rootScope.$on('$routeChangeStart', function(event, next, current) {
            if(next.$$route) {
                $rootScope.currentRoute = next.$$route.templateUrl;
                console.log($rootScope.currentRoute)
            }
        })
    })
