'use strict';

angular.module('my-disasters.my-disasters',[])
    .controller('DisastersCtrl', DisastersCtrl).
service('DisasterService', function($http){
    this.getEarthquakes = function(info){

    };

    this.getFire = function(info){

    };
});

function DisastersCtrl($q, $timeout,$scope, $http,MapService){
    var self = this;
    var pendingSearch, cancelSearch = angular.noop;
    var cachedQuery, lastSearch;
    self.allDisasters = loadDisasters();
    self.disasters = [];
    self.filterSelected = true;
    self.querySearch = querySearch;
    self.delayedQuerySearch = delayedQuerySearch;

    function querySearch (criteria) {
        cachedQuery = cachedQuery || criteria;
        return cachedQuery ? self.allDisasters.filter(createFilterFor(cachedQuery)) : [];
    }
    /**
     * Async search for contacts
     * Also debounce the queries; since the md-contact-chips does not support this
     */
    function delayedQuerySearch(criteria) {
        cachedQuery = criteria;
        if ( !pendingSearch || !debounceSearch() )  {
            cancelSearch();
            return pendingSearch = $q(function(resolve, reject) {
                // Simulate async search... (after debouncing)
                cancelSearch = reject;
                $timeout(function() {
                    resolve( self.querySearch() );
                    refreshDebounce();
                }, Math.random() * 500, true)
            });
        }
        return pendingSearch;
    }
    function refreshDebounce() {
        lastSearch = 0;
        pendingSearch = null;
        cancelSearch = angular.noop;
    }
    /**
     * Debounce if querying faster than 300ms
     */
    function debounceSearch() {
        var now = new Date().getMilliseconds();
        lastSearch = lastSearch || now;
        return ((now - lastSearch) < 300);
    }
    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(disaster) {
            return (disaster._lowername.indexOf(lowercaseQuery) != -1);
        };
    }
    function loadDisasters() {
        var disasters = [
            'Drought',
            'Fire',
            'Earthquakes',
            'Thunderstorms',
            'Flooding'
        ];
        return disasters.map(function (c, index) {
            var cParts = c.split(' ');
            var disaster = {
                name: c,
                image: 'public/images/disasters/' + index+'.png'
            };
            disaster._lowername = disaster.name.toLowerCase();
            return disaster;
        });
    }
	/*$http
		.get('http://localhost:3300/earthquakes')
		.then(function(result) {
			for (var i=0; i<result.data.length; i++)
				MapService.addLayer(result.data[i].geometry.coordinates[0],result.data[i].geometry.coordinates[1]);
		});*/
}
