'use strict';

angular.module('my-disasters.my-disasters',[])
.constant('ENDPOINT','http://localhost:3300/')
.controller('DisastersCtrl', DisastersCtrl)
.service('DisasterService', function($http, ENDPOINT){
    var service = this;

    function getUrl(path){
        return ENDPOINT + path;
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

function DisastersCtrl($http,MapService){
    $http({
  method: 'GET',
  url: 'http://localhost:3300/earthquakes'
}).then(function(response) {
	for (var i=0; i<response.data.length; i++){
			MapService.addLayer(response.data[i].geometry.coordinates[0],response.data[i].geometry.coordinates[1]);

		}
	}
);
}