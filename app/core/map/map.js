'use strict';

var myMap = angular.module('my-app.my-map',[]);

myMap.service('MapService',function(){
    this.map = new ol.Map({
        target: 'map'
    });

    this.layer = new ol.layer.Tile({
        source: new ol.source.OSM()
    });

    this.view = new ol.View({
        center:ol.proj.fromLonLat([0,0]),
        zoom: 10,
        minZoom: 3,
        maxZoom: 15
    });

    this.map.setView(this.view);

    this.map.addLayer(this.layer);

    this.addLayer = function(info){

    }

    this.addMarker = function(info){

    }

    this.updateLocation = function(longitude, latitude){
        this.map.getView().setCenter(ol.proj.transform([longitude, latitude], 'EPSG:4326', 'EPSG:3857'));
    }
});

myMap.controller('MapCtrl', MapCtrl);

function MapCtrl ($scope,MapService) {
    /**
      * Make Map not to be stretched
      */
    angular.element(document).ready(function () {
        MapService.map.updateSize();
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            MapService.updateLocation(position.coords.longitude,position.coords.latitude);
        });
    }
}
