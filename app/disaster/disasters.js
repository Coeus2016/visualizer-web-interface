'use strict';

angular.module('my-disasters.my-disasters',[])
.constant('ENDPOINT','http://localhost:3300/')
.controller('DisastersCtrl', DisastersCtrl)
.service('DisasterService', function($http, ENDPOINT){
    var service = this;
    this.earthData = [];
    this.earth = [];

    function getUrl(path){
        return ENDPOINT + path;
    }

    this.addEarth = function(data){
    	this.earthData.push(data);
    }

    this.clearEarth = function(){
    	while (this.earth.length > 0) {
            this.earth.pop();
        }
    }

    service.getEarthquakes = function(info){
        var startDate ="";
        var endDate ="";
        return $http.get(getUrl("earthquakes")+"");
    };

    service.getEarth = function(info){
        var startDate ="";
        var endDate ="";
        return $http.get(getUrl("fires")+"");

    };

});

function DisastersCtrl($http,MapService,$scope,DisasterService,$mdDialog,store,$q){
	$scope.isOn = [false,false,false,false];
	$scope.btnColors = ['accent','accent','accent','accent'];
	$scope.earthData = DisasterService.earthData;

	$scope.getFilter = function(){
		var deferred = $q.defer();

		$http
			.get(
				'http://localhost:3300/getearthquakefilter',
				{
					headers: {
						"Authorization": "Bearer "+store.get('jwt')
					}
				}
			).then(
				function(response) {
	        		store.set('earthfilter',response.data.message);
	        		deferred.resolve(response);
	      		}, function(error) {
	      			deferred.reject(error);
	      		}
	      	);

		return deferred.promise;
	}

	$scope.getDistanceFromLatLonInKm = function(lat2,lon2) {
		var lat1 = store.get('latitude');
		var lon1 = store.get('longitude');

 		var R = 6371; // Radius of the earth in km
  		var dLat = deg2rad(lat2-lat1);  // deg2rad below
  		var dLon = deg2rad(lon2-lon1); 
  		var a = 
    		Math.sin(dLat/2) * Math.sin(dLat/2) +
    		Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    		Math.sin(dLon/2) * Math.sin(dLon/2); 
 	 	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  		var d = R * c; // Distance in km
  		
  		return Math.round(d); //RoundOff distance
	}

	function deg2rad(deg) {
  		return deg * (Math.PI/180);
	}

	$scope.init = function(){
		var filtered = $scope.getFilter();

		filtered.then(
			function(resolve){
        		$http
					.post(
						'http://localhost:3300/filteredquakes',
						{
							longitude: store.get('longitude'),
							latitude: store.get('latitude')
						},
						{
							headers: {
								"Authorization": "Bearer "+store.get('jwt')
							}
						}
					).then(
						function(response) {
							console.log(response);
							for (var i=0; i<response.data.length; i++){
								var tmp = response.data[i].properties.title;
								response.data[i].properties.title = tmp.substring(tmp.indexOf(" - ")+3, tmp.length);
								DisasterService.addEarth(response.data[i]);
								console.log($scope.earthData);
								MapService.addEarth(response.data[i].geometry.coordinates[0],response.data[i].geometry.coordinates[1],response.data[i],response.data[i]);
							}
							//MapService.setEarth(DisasterService);
						}
					);
        	}, function(reject){
        		console.log(reject)      
    		}
    	);
	}

	$scope.showSignUp = function(ev){
	    $mdDialog.show({
	      	controller: DialogController,
	      	templateUrl: 'disaster/earthquakes.html',
	      	parent: angular.element(document.body),
	      	targetEvent: ev,
	      	clickOutsideToClose:true,
	  		fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
	    });
	};

	function DialogController($scope, $mdDialog,$http,store,$mdToast){
		$scope.quake = store.get('earthfilter');

    	$scope.hide = function(){
      		$mdDialog.hide();
    	};

    	$scope.cancel = function(){
      		$mdDialog.cancel();
    	};

    	$scope.saveEarthquakeFilter = function(){
    		var temp = angular.toJson($scope.quake);

			$http
				.post(
					'http://localhost:3300/earthquakefilter',
					{
						filter: temp
					},
					{
						headers: {
							"Authorization": "Bearer "+store.get('jwt')
						}
					}
				).then(
					function(response) {
	        			$scope.cancel();
	        			$mdToast.show($mdToast.simple().textContent('Earthquake filter was saved.'));
	      			}, function(error) {
	       				$mdToast.show($mdToast.simple().textContent('Earthquake filter failed saved.'));
	      			}
	      		);
    	}
  	}
}