'use strict';

var myDistasters= angular.module('my-disasters.my-disasters',[]);

myDistasters.controller('DisastersCtrl', DisastersCtrl);

function DisastersCtrl($scope,$http,MapService){
	$http
		.get('http://localhost:3300/earthquakes')
		.then(function(result) {
			for (var i=0; i<result.data.length; i++)
				MapService.addLayer(result.data[i].geometry.coordinates[0],result.data[i].geometry.coordinates[1]);

			MapService.markers.refreshClusters();
		});
}