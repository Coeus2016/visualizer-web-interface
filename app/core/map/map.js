'use strict';
angular.module('my-app.my-map',[

]).
controller('MapCtrl', MapCtrl);

function MapCtrl ($scope) {
    var layer = new ol.layer.Tile({
        source: new ol.source.OSM()
    });

    var view = new ol.View({
        center:[0, 0],
        zoom: 1
    });

    var target = 'map';

    $scope.map= new ol.Map({
        target: 'map'
    });
    $scope.map.setView(view);

    $scope.map.addLayer(layer);

    function addLayer(info){

    }

    function addMarker(info){

    }

    function updateLocation(){

    }




}
