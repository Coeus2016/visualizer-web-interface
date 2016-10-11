'use strict';

var myApp = angular.module('my-app', [
  'ngMaterial',
  'ngSanitize',
  'ui.router',
  'main',
  'welcome',
  'my-disasters.my-disasters',
  'weather',
  'my-app.my-map',
  'angular-jwt',
  'angular-storage'
]);

myApp.controller('AppCtrl',AppCtrl);

myApp.config(function($locationProvider,$mdThemingProvider,$stateProvider,$urlRouterProvider) {
    var mycolor = $mdThemingProvider.extendPalette('indigo');
    $mdThemingProvider.definePalette('mycolor', mycolor);

    $mdThemingProvider.theme('default')
    .primaryPalette('indigo',{'default': '800'})
    .accentPalette('indigo', {'default': '600'});

    $stateProvider
      .state("main",{
        url: "/main",
        templateUrl: "main/app.html",
        redirectTo: 'main.weather.list',
        data: {
          requiresLogin: true
        }
      })
      .state("main.disasters",{
        url: "/disasters",
        templateUrl: "templates/disasters.html",
        data: {
          requiresLogin: true
        }
      })
      .state("welcome",{
          url: "/welcome",
          templateUrl: "home/index.html"
        }
      );

    $urlRouterProvider.otherwise("/welcome");
});

myApp.run(function($rootScope, $state, store, jwtHelper) {
  $rootScope.$on('$stateChangeStart', function(e, to,params) {
    if (to.redirectTo){
      e.preventDefault();
      $state.go(to.redirectTo, params, {location: 'replace'})
    }
    if (to.data && to.data.requiresLogin){
      if (!store.get('jwt') || jwtHelper.isTokenExpired(store.get('jwt'))) {
        e.preventDefault();
        $state.go("welcome",{});
      }
    }
  });
});

function AppCtrl () {
  
}