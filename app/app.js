'use strict';

var myApp = angular.module('my-app', ['ngMaterial','ngSanitize','my-app.my-map']);
myApp.controller('AppCtrl',AppCtrl);

myApp.config(function($locationProvider,$mdThemingProvider) {
    $locationProvider.hashPrefix('!');
    $mdThemingProvider.theme('default')
    .primaryPalette('lime')
    .accentPalette('orange');
});

function AppCtrl ($timeout, $q, $log,$scope,$http,MapService) {
  $scope.geospatial = ('weather disasters').split(' ').map(function(gisdata) {
    return {data: gisdata};
  });

  var self = this;
  self.simulateQuery = false;
  self.isDisabled    = false;
  self.querySearch   = querySearch;
  self.selectedItemChange = selectedItemChange;
  self.searchTextChange   = searchTextChange;
  // ******************************
  // Internal methods
  // ******************************
  /**
    * Search for repos... use $timeout to simulate
    * remote dataservice call.
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
    else
      MapService.updateLocation(item.geometry.coordinates[0],item.geometry.coordinates[1]);
  }
}