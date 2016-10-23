var myApp = angular.module('main', ['ngMaterial']);
myApp.controller('MainCtrl',MainCtrl);
myApp.service('MService', function(){
  this.notification = {
    value: 0
  };
});

function MainCtrl($timeout,MService, $q,$scope,$http,$state,$window,MapService,WeatherService,$rootScope,store,jwtHelper,socket,DisasterService,$location){
  $scope.payload = jwtHelper.decodeToken(store.get("jwt"));
  $scope.notification = MService.notification;

  $scope.payload = jwtHelper.decodeToken(store.get("jwt"));
  socket.on($scope.payload.email, function (data) {
    var list = DisasterService.earthData;
    var hasMatch = false;

    for (var i = 0; i < list.length; i++){
      var temp = list[i];

      if(temp.id == data.id){
        hasMatch = true;
        break;
      }
    }

    if (!hasMatch){
      DisasterService.addEarth(data);
      MapService.addEarth(data.geometry.coordinates[0],data.geometry.coordinates[1],data);
      $scope.notification.value++;
    }
  });

  $scope.clearNotif = function(){
    if ($state.current.name=="main.disasters")
      $scope.notification.value = 0;
    else
      $state.go('main.disasters');
  }

  $scope.geospatial = [
    {"data": "weather"},
   	{"data": "disasters"}
  ];

  $scope.gis = {"data": "weather"};

  $scope.logout = function(){
    store.remove('jwt');
    $location.path('/welcome');
    $window.location.reload();
    //$state.go('welcome',{},{ reload: true });
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
  
  }
  
  function selectedItemChange(item) {
    if (item===undefined){}
    else {
      MapService.updateLocation(item.geometry.coordinates[0],item.geometry.coordinates[1]);
      MapService.addMarker(item.geometry.coordinates[0],item.geometry.coordinates[1],item.properties.name);
      //MapService.addLayer(item.geometry.coordinates[0],item.geometry.coordinates[1]);
      WeatherService.push(item);
    }
  }
}