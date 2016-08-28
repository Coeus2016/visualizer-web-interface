'use strict';

var myApp = angular.module('my-app', ['ngMaterial','ngSanitize','my-app.my-map','ui.router','my-disasters.my-disasters','weather']);
myApp.controller('AppCtrl',AppCtrl);

myApp.config(function($locationProvider,$mdThemingProvider,$stateProvider,$urlRouterProvider) {
    $mdThemingProvider.theme('default')
    .primaryPalette('lime',{'default': '800'})
    .accentPalette('lime', {'default': '500'});

    $stateProvider
      .state("weather",{
        url: "/weather",
        templateUrl: "templates/weather.html"
      })
      .state("disasters",{
        url: "/disasters",
        templateUrl: "templates/disasters.html"
      })
      .state("weather.data",{
        url: "/data",
        templateUrl: "templates/weather.data.html"
      })
      .state("weather.settings",{
        url: "/settings",
        templateUrl: "templates/weather.settings.html"
      })
      .state("/",{
        url: "/",
        templateUrl: "templates/index.html"
      });

    $urlRouterProvider.otherwise("/weather");
});

function AppCtrl ($timeout, $q, $log,$scope,$http,MapService,WeatherService,$state) {
  $scope.geospatial = [
    {"data": "weather"},
    {"data": "disasters"}
  ];

  $scope.gis = {"data": "weather"};

  $scope.selectChanged = function(){
    $state.go($scope.gis.data);
  };

  var self = this;
  self.querySearch   = querySearch;
  self.selectedItemChange = selectedItemChange;
  self.searchTextChange   = searchTextChange;
  
  /**
    * Reverse geolocation
    */
  function querySearch (query) {
    return $http.get('http://photon.komoot.de/api/?limit=5&q=' + escape(query))
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
      WeatherService.push(item);
    }
  }
}