'use strict';

angular.module('my-disasters.my-disasters',[])
.constant('ENDPOINT','http://localhost:3300/')
.controller('DisastersCtrl', DisastersCtrl)
.service('DisasterService', function($http, ENDPOINT){
    var service = this;
    this.fireData = [];
    this.fire = [];

    function getUrl(path){
        return ENDPOINT + path;
    }

    this.addFire = function(data){
    	this.fireData.push(data);
    }

    service.getEarthquakes = function(info){
        var startDate ="";
        var endDate ="";
        return $http.get(getUrl("earthquakes")+"");
    };

    service.getFire = function(info){
        var startDate ="";
        var endDate ="";
        return $http.get(getUrl("fires")+"");

    };

});

function DisastersCtrl($http,MapService,$scope,DisasterService){
	$scope.isOn = [false,false,false,false];
	$scope.btnColors = ['accent','accent','accent','accent'];
	$scope.fireData = DisasterService.fire;
	
	$scope.filter = function(index){
		$scope.isOn[index] = !$scope.isOn[index];

		if ($scope.btnColors[index]=='primary')
			$scope.btnColors[index]="accent";
		else
			$scope.btnColors[index]="primary";
	}

    $http({
  		method: 'GET',
  		url: 'http://localhost:3300/earthquakes'
	}).then(function(response) {
		for (var i=0; i<response.data.length; i++){
			DisasterService.addFire(response.data[i]);
			MapService.addLayer(response.data[i].geometry.coordinates[0],response.data[i].geometry.coordinates[1],response.data[i],response.data[i]);
		}
		MapService.setEarth(DisasterService);
	});
}