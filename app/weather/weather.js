'use strict';

var myWeather= angular.module('weather',[]);

myWeather.service('WeatherService',function(){
	this.favourates = [];
	this.push= function(data){
		this.favourates.push(data);
	}
	this.getFavourates = function(){
		return this.favourates;
	}
});

myWeather.controller('WeatherCtrl', WeatherCtrl);

function WeatherCtrl($scope,WeatherService,MapService,$state){
	$scope.favourates = WeatherService.favourates;

	$scope.loadWeather = function(data) {
		MapService.updateLocation(data.geometry.coordinates[0],data.geometry.coordinates[1]);
		$state.go("weather.forecast");
	};

	$scope.back = function(){
		$state.go("weather.list");
	}

	$scope.$on('$stateChangeSuccess',function onStateSuccess(event, toState,toParams,fromState){
		if (toState.name=="weather.list")
			$scope.isActive = false;
		else if (toState.name=="weather.forecast")
			$scope.isActive = true;
		else
			$scope.isActive = false;
	});
}