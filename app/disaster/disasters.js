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

function DisastersCtrl($http,MapService,$scope,DisasterService,$mdDialog,store){
	$scope.isOn = [false,false,false,false];
	$scope.btnColors = ['accent','accent','accent','accent'];
	$scope.earthData = DisasterService.earth;

	$scope.init = function(){
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
	      		}, function(error) {
	      		}
	      	);
	}

	$scope.showSignUp = function(ev){
		console.log(store.get('longitude'));
		console.log(store.get('latitude'));
	    $mdDialog.show({
	      	controller: DialogController,
	      	templateUrl: 'disaster/earthquakes.html',
	      	parent: angular.element(document.body),
	      	targetEvent: ev,
	      	clickOutsideToClose:true,
	  		fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
	    });
	};
	
	$scope.filter = function(index){
		$scope.isOn[index] = !$scope.isOn[index];

		if ($scope.isOn[index]){
			if (index==0){
				$http({
  					method: 'GET',
  					url: 'http://localhost:3300/fires'
				}).then(function(response) {
					for (var i=0; i<500; i++){
						MapService.addFire(response.data[i].longitude,response.data[i].latitude);
					}
				});
			}
			else if (index==1){
				$http({
  					method: 'GET',
  					url: 'http://localhost:3300/earthquakes'
				}).then(function(response) {
					for (var i=0; i<response.data.length; i++){
						DisasterService.addEarth(response.data[i]);
						MapService.addEarth(response.data[i].geometry.coordinates[0],response.data[i].geometry.coordinates[1],response.data[i],response.data[i]);
					}
					MapService.setEarth(DisasterService);
				});
			}
		}else {
			if (index==0)
				MapService.removeFire();
			else if (index==1){
				MapService.removeEarth();
				DisasterService.clearEarth();
			}
		}

		if ($scope.btnColors[index]=='primary')
			$scope.btnColors[index]="accent";
		else
			$scope.btnColors[index]="primary";
	}

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