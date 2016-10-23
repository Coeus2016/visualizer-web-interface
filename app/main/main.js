var myApp = angular.module('main', ['ngMaterial']);
myApp.controller('MainCtrl',MainCtrl);

function MainCtrl($timeout, $q, $log,$scope,$http,$state,MapService,WeatherService,$rootScope,store,jwtHelper,socket,DisasterService){
  $scope.payload = jwtHelper.decodeToken(store.get("jwt"));
  $scope.notification = 3;

  $scope.payload = jwtHelper.decodeToken(store.get("jwt"));
  socket.on($scope.payload.email, function (data) {
    DisasterService.addEarth(data);
    $scope.notification++;
    console.log(data);
  });

  $scope.clearNotif = function(){
    $scope.notification = 0;
    if ($scope.notification){
      $state.go('main.disasters',{},{ reload: true });
    }
  }

  $scope.geospatial = [
    {"data": "weather"},
   	{"data": "disasters"}
  ];

  $scope.gis = {"data": "weather"};

  $scope.logout = function(){
    store.remove('jwt');
    $state.go('welcome',{},{ reload: true });
  };

  $scope.selectChanged = function(){
  	$state.go("main."+$scope.gis.data);
  };

  $scope.$on('$stateChangeSuccess',function onStateSuccess(event, toState,toParams,fromState){
    if (toState.name=="main.weather.list")
     	$scope.gis.data = "weather";
    else if (toState.name=="main.weather.forecast")
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
  function querySearch (query) {

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
      MapService.addMarker(item.geometry.coordinates[0],item.geometry.coordinates[1],item.properties.name);
      //MapService.addLayer(item.geometry.coordinates[0],item.geometry.coordinates[1]);
      WeatherService.push(item);
    }
  }
}