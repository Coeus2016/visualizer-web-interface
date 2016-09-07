'use strict';

var myWeather= angular.module('weather',[]);

myWeather.service('WeatherService',function(){
	this.favourates = [];
	this.weather = {"country":"", "description":"","name":"","temp":"","temp_min":"","temp_max":"","icon":""};
	this.forecast = [];

	this.initializeForecast = function(){
		for (var i=0; i<40; i++){

			var result = {
				"temp": "",
				"temp_min": "",
				"temp_max": "",
				"icon": "",
				"day": ""
			};

			this.forecast.push(result);
		}
	}

	this.push= function(data){
		this.favourates.push(data);
	}
});

myWeather.controller('WeatherCtrl', WeatherCtrl);

function WeatherCtrl($scope,WeatherService,MapService,$state,$http){
	$scope.favourates = WeatherService.favourates;
	$scope.weather = WeatherService.weather;
	$scope.forecast = WeatherService.forecast;
	$scope.cardColors = ['','accent','accent','accent','accent'];

	WeatherService.initializeForecast();

	$scope.activateButton = function(index){
		$scope.cardColors[index] = '';
		
		for (var i=0; i<5; i++)
			if ($scope.cardColors[i]=='' && index!=i)
				$scope.cardColors[i]='accent';

		//$scope.cardColors[0] = !$scope.cardColors[0];
	}

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
			var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

			WeatherService.weather.country = data[0].country;
			WeatherService.weather.name = data[0].description;
			WeatherService.weather.description = data[0].weather_description;
			WeatherService.weather.temp = Math.round(data[0].temp);
			WeatherService.weather.temp_min = Math.round(data[0].temp_min);
			WeatherService.weather.temp_max = Math.round(data[0].temp_max);
			WeatherService.weather.icon = data[0].weather_icon;

			for (var i=0; i<data.length; i++){
				var d = new Date(data[i].time);
				var day = days[d.getDay()];

				WeatherService.forecast[i].temp = Math.round(data[i].temp);
				WeatherService.forecast[i].temp_min = Math.round(data[i].temp_min);
				WeatherService.forecast[i].temp_max = Math.round(data[i].temp_max);
				WeatherService.forecast[i].icon = data[i].weather_icon;
				WeatherService.forecast[i].day = day;
			}
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