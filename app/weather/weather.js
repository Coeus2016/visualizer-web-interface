'use strict';

var myWeather= angular.module('weather',[]);

myWeather.config(function ($stateProvider){
	$stateProvider
	  .state("main.weather",{
        url: "/weather",
        templateUrl: "templates/weather.html",
        redirectTo: 'main.weather.list',
        data: {
          requiresLogin: true
        }
      })
	  .state("main.weather.list",{
        url: "/list",
        templateUrl: "templates/weather.list.html",
        data: {
          requiresLogin: true
        }
      })
      .state("main.weather.forecast",{
        url: "/forecast",
        templateUrl: "templates/weather.forecast.html",
        data: {
          requiresLogin: true
        }
      })
});

myWeather.service('WeatherService',function(){
	this.favourates = [];
	this.weather = {"country":"", "description":"","name":"","temp":"","temp_min":"","temp_max":"","icon":""};
	this.forecast = [];
	this.colors = [];

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
		this.colors.push("grey");
		this.favourates.push(data);
	}

	this.clear = function(){
		while(this.favourates.length>0){
    		this.favourates.pop();
		}
		while(this.colors.length>0){
    		this.colors.pop();
		}
	}
});

myWeather.controller('WeatherCtrl', WeatherCtrl);

function WeatherCtrl($scope,WeatherService,MapService,$state,$http,store){
	$scope.colors = WeatherService.colors;
	$scope.favourates = WeatherService.favourates;
	$scope.weather = WeatherService.weather;
	$scope.forecast = WeatherService.forecast;
	$scope.cardColors = ['grey-A100','accent','accent','accent','accent'];

	WeatherService.initializeForecast();

	$scope.init = function(){
		$http
			.get(
				'http://localhost:3300/getfavourate',
				{
					headers: {
						"Authorization": "Bearer "+store.get('jwt')
					}
				}
			).then(
				function(response) {
					WeatherService.clear();
					MapService.removeMarker();
        			for (var i=0; i<response.data.message.length; i++){
        				var tmp = angular.fromJson(response.data.message[i]);
        				WeatherService.push(tmp);
        				MapService.addMarker(tmp.geometry.coordinates[0],tmp.geometry.coordinates[1],tmp.properties.name);
        				$scope.colors[i] = "accent";
        			}
      			}, function(error) {
       				//$mdToast.show($mdToast.simple().textContent('email or password incorrect.'));
      			}
      		);
	}

	$scope.callPopup = function(index){
		MapService.mapClick(index);
	}

	$scope.closePopup = function(index){
		MapService.mapClickClose(index);
	}

	$scope.activateButton = function(index){
		$scope.cardColors[index] = 'grey-A100';

		for (var i=0; i<5; i++)
			if ($scope.cardColors[i]=='grey-A100' && index!=i)
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

	$scope.trackingFunction

	$scope.favourate = function(data,index){
		var temp = angular.toJson(data);

		$http
			.post(
				'http://localhost:3300/favourate',
				{
					favourate: temp
				},
				{
					headers: {
						"Authorization": "Bearer "+store.get('jwt')
					}
				}
			).then(
				function(response) {
        			if (response.data.message=="removed"){
        				$scope.colors[index] = "grey";
        			}
        			else if (response.data.message=="added"){
        				$scope.colors[index] = "accent";
        			}
      			}, function(error) {
       				//$mdToast.show($mdToast.simple().textContent('email or password incorrect.'));
      			}
      		);
	}

	$scope.loadWeather = function(data) {
		MapService.updateLocation(data.geometry.coordinates[0],data.geometry.coordinates[1]);
		$state.go("main.weather.forecast");

		$http
			.post(
				'http://localhost:3300/getweather',
				{
					lon: data.geometry.coordinates[0],
					lat: data.geometry.coordinates[1]
				},
				{
					headers: {
						"Authorization": "Bearer "+store.get('jwt')
					}
				}
			)
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
			WeatherService.weather.humidity = data[0].humidity;
			WeatherService.weather.wind = data[0].wind.speed;

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
		$state.go("main.weather.list");
	}

	$scope.$on('$stateChangeSuccess',function onStateSuccess(event, toState,toParams,fromState){
		if (toState.name=="main.weather.list")
			$scope.isActive = false;
		else if (toState.name=="main.weather.forecast")
			$scope.isActive = true;
		else
			$scope.isActive = false;
	});
}