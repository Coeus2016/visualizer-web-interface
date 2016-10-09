'use strict';

//var myApp = angular.module('my-app', ['ngMaterial','ngSanitize','my-app.my-map','ui.router','my-disasters.my-disasters','weather']);
var myApp = angular.module('my-app', ['ngMaterial','ngSanitize','ui.router']);
myApp.controller('AppCtrl',AppCtrl);

myApp.config(function($locationProvider,$mdThemingProvider,$stateProvider,$urlRouterProvider) {
    var mycolor = $mdThemingProvider.extendPalette('indigo');
    $mdThemingProvider.definePalette('mycolor', mycolor);

    $mdThemingProvider.theme('default')
    .primaryPalette('indigo',{'default': '800'})
    .accentPalette('indigo', {'default': '600'});

    $stateProvider
      .state("weather",{
        url: "/weather",
        templateUrl: "templates/weather.html",
        redirectTo: 'weather.list'
      })
      .state("disasters",{
        url: "/disasters",
        templateUrl: "templates/disasters.html"
      })
      .state("weather.list",{
        url: "/list",
        templateUrl: "templates/weather.list.html"
      })
      .state("weather.forecast",{
        url: "/forecast",
        templateUrl: "templates/weather.forecast.html"
      })
      .state("/",{
        url: "/",
        templateUrl: "templates/index.html"
      })
      .state("welcome",{
          url: "/welcome",
          templateUrl: "templates/welcome.html"
        }
      );

    //$urlRouterProvider.otherwise("/weather/list");
    $urlRouterProvider.otherwise("/welcome");
});

//function AppCtrl ($timeout, $q, $log,$scope,$http,MapService,WeatherService,$state) {
function AppCtrl ($timeout, $q, $log,$scope,$http,$state) {
  /*$scope.geospatial = [
    {"data": "weather"},
    {"data": "disasters"}
  ];

  $scope.gis = {"data": "weather"};

  $scope.selectChanged = function(){
    $state.go($scope.gis.data);
  };

  $scope.$on('$stateChangeStart', function(evt, to, params) {
    if (to.redirectTo) {
      evt.preventDefault();
      $state.go(to.redirectTo, params, {location: 'replace'})
    }
  });

  $scope.$on('$stateChangeSuccess',function onStateSuccess(event, toState,toParams,fromState){
    if (toState.name=="weather.list")
      $scope.gis.data = "weather";
    else if (toState.name=="weather.forecast")
      $scope.gis.data = "weather";
    else
      $scope.gis.data = "disasters";
  });

  var self = this;
  self.querySearch   = querySearch;
  self.selectedItemChange = selectedItemChange;
  self.searchTextChange   = searchTextChange;
  
  /**
    * Reverse geolocation
    */
  /*function querySearch (query) {
    return $http.get('http://photon.komoot.de/api/?lat='+MapService.latitude+'&lon='+MapService.longitude+'&limit=5&q=' + escape(query))
                .then(function(result) {
                  self.data = result.data.features;
                  return result.data.features;
                });
  }
  
  function searchTextChange(text) {
    $log.info('Text changed to ' + text);
  }
  
  function selectedItemChange(item) {
    $log.info('Item changed to ' + JSON.stringify(item));
    if (item===undefined){}
    else {
      MapService.updateLocation(item.geometry.coordinates[0],item.geometry.coordinates[1]);
      MapService.addMarker(item.geometry.coordinates[0],item.geometry.coordinates[1]);
      //MapService.addLayer(item.geometry.coordinates[0],item.geometry.coordinates[1]);
      WeatherService.push(item);
    }
  }*/
}