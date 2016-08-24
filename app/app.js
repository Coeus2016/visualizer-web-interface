'use strict';

var myApp = angular.module('my-app', ['ngMaterial','ngSanitize','my-app.my-map']);
myApp.controller('AppCtrl',AppCtrl);

myApp.config(function($locationProvider,$mdThemingProvider) {
    $locationProvider.hashPrefix('!');
    $mdThemingProvider.theme('default')
    .primaryPalette('lime')
    .accentPalette('orange');
});

function AppCtrl ($timeout, $q, $log,$scope) {
  $scope.user = {
      title: 'Developer',
      email: 'ipsum@lorem.com',
      firstName: '',
      lastName: '',
      company: 'Google',
      address: '1600 Amphitheatre Pkwy',
      city: 'Mountain View',
      state: 'CA',
      biography: 'Loves kittens, snowboarding, and can type at 130 WPM.\n\nAnd rumor has it she bouldered up Castle Craig!',
      postalCode: '94043'
    };
    $scope.states = ('Weather Disasters').split(' ').map(function(state) {
        return {abbrev: state};
      });

  var self = this;
  self.simulateQuery = false;
  self.isDisabled    = false;
  self.repos         = loadAll();
  self.querySearch   = querySearch;
  self.selectedItemChange = selectedItemChange;
  self.searchTextChange   = searchTextChange;
  // ******************************
  // Internal methods
  // ******************************
  /**
    * Search for repos... use $timeout to simulate
    * remote dataservice call.
    */
  function querySearch (query) {
    var results = query ? self.repos.filter( createFilterFor(query) ) : self.repos,deferred;
    if (self.simulateQuery) {
      deferred = $q.defer();
      $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
      return deferred.promise;
    } else {
      return results;
    }
  }
  
  function searchTextChange(text) {
    $log.info('Text changed to ' + text);
  }
  
  function selectedItemChange(item) {
    $log.info('Item changed to ' + JSON.stringify(item));
  }
  
  /**
    * Build `components` list of key/value pairs
    */
  function loadAll() {
    var repos = [{
      'name'      : 'Angular 1',
      'url'       : 'https://github.com/angular/angular.js',
      'watchers'  : '3,623',
      'forks'     : '16,175',
    },
    {
      'name'      : 'Angular 2',
      'url'       : 'https://github.com/angular/angular',
      'watchers'  : '469',
      'forks'     : '760',
    },
    {
      'name'      : 'Angular Material',
      'url'       : 'https://github.com/angular/material',
      'watchers'  : '727',
      'forks'     : '1,241',
    },
    {
      'name'      : 'Bower Material',
      'url'       : 'https://github.com/angular/bower-material',
      'watchers'  : '42',
      'forks'     : '84',
    },
    {
      'name'      : 'Material Start',
      'url'       : 'https://github.com/angular/material-start',
      'watchers'  : '81',
      'forks'     : '303',
    }];
    
    return repos.map( function (repo) {
      repo.value = repo.name.toLowerCase();
      return repo;
    });
  }
  
  /**
    * Create filter function for a query string
    */
  function createFilterFor(query) {
    var lowercaseQuery = angular.lowercase(query);
    return function filterFn(item) {
      return (item.value.indexOf(lowercaseQuery) === 0);
    };
  }
}