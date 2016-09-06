'use strict';

var myWeather= angular.module('weather',[]);

myWeather.service('WeatherService',function(){
	this.favourates = [];
	this.weather = {"country":"", "description":"","name":"","temp":"","temp_min":"","temp_max":""};
	this.push= function(data){
		this.favourates.push(data);
	}
});

myWeather.controller('WeatherCtrl', WeatherCtrl);

function WeatherCtrl($scope,WeatherService,MapService,$state,$http){
	$scope.favourates = WeatherService.favourates;
	$scope.weather = WeatherService.weather;

	$scope.getTime = function(){
		var d = new Date();

		var hr = d.getHours();
		var min = d.getMinutes();

		var ampm = hr < 12 ? "AM" : "PM";

		return (hr + ":" + min + ampm);
	}

	$scope.getDate = function(){
		var d = new Date();
		var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		var date = d.getDate();
		var month = months[d.getMonth()];
		var year = d.getFullYear();

		return (date+" "+month+" "+year);
	}

	$scope.loadWeather = function(data) {
		MapService.updateLocation(data.geometry.coordinates[0],data.geometry.coordinates[1]);
		$state.go("weather.forecast");

		$http
			.post('http://localhost:3300/getweather',{lon: data.geometry.coordinates[0], lat: data.geometry.coordinates[1]})
			.then(function(result){
				extractData(result.data);
			});
	};

	function extractData(data){
		if (typeof data !== 'undefined'){
			WeatherService.weather.country = data[0].country;
			WeatherService.weather.name = data[0].description;
			WeatherService.weather.description = data[0].weather_description;
			WeatherService.weather.temp = Math.round(data[0].temp);
			WeatherService.weather.temp_min = Math.round(data[0].temp_min);
			WeatherService.weather.temp_max = Math.round(data[0].temp_max);
		}
		console.log(data);
	}

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