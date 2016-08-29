'use strict';

angular.module('my-disasters.my-disasters',[])
.constant('ENDPOINT','http://localhost:3300/')
.controller('DisastersCtrl', DisastersCtrl)
.service('DisasterService', function($http, ENDPOINT){
    var service = this;

    function getUrl(path){
        return ENDPOINT + path;
    }

    service.getEarthquakes = function(info){
        var startDate ="";
        var endDate ="";
        return $http.get(getUrl("earthquakes")+"");
    };

    service.getFire = function(info){
        var startDate ="";
        var endDate ="";
        return $http.get(getUrl("fires")+"");

    };

});

function DisastersCtrl($q, $timeout,$log,$scope,MapService, DisasterService){
    var self = this;
    self.allDisasters = loadDisasters();
    self.disasters = [];

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

    self.toggle = function (item, list) {
        var idx = list.indexOf(item);
        if (idx > -1) {
            list.splice(idx, 1);
            //REMOVE
            switch (item.name ){
                case 'Earthquakes':
                        MapService.removeEarthLayer();
                    break;
                case 'Fire':
                        MapService.removeFireLayer();
                    break;
            }

        }
        else {
            //ADD
            list.push(item);
            switch (item.name ) {
                case 'Earthquakes':
                {

                    DisasterService.getEarthquakes("hee").then(function (result) {

                        MapService.addEarthLayer(result);
                    });
                }
                    break;
                case 'Fire':{
                    DisasterService.getFire("hee").then(function (result) {

                        MapService.addFireLayer(result);
                    });
                }
                    break;
            }


        }

    };
    self.exists = function (item, list) {
        return list.indexOf(item) > -1;
    };

    function updateLayer(){
        var data;
        for (var i=0; i<disasters.length; i++){

        }
       // DisasterService.addLayer(disasters);
    }
}
