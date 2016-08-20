'use strict';

var myApp = angular.module('my-app', [
    'ngMaterial',
    'ngSanitize'
]).
config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('!');


}]);
