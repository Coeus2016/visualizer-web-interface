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

function WeatherCtrl($scope,WeatherService){
	$scope.favourates = WeatherService.favourates;

	$scope.loadWeather = function() {
    	console.log("Lol");
	};
}