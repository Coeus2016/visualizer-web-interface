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

    this.vectorSource = new ol.source.Vector({
        //create empty vector
    });

    //create the style
    this.iconStyle = new ol.style.Style({
        image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
            anchor: [0.5, 46],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            opacity: 0.75,
            src: 'public/images/location.png'
        }))
    });

    var self = this;
    this.markerLayer = new ol.layer.Vector({
        source: self.vectorSource,
        style: self.iconStyle
    });

    this.longitude = 0;

    this.latitude = 0;

    this.map.setView(this.view);

    this.map.addLayer(this.layer);

    this.map.addLayer(this.markerLayer);

    this.addLayer = function(longitude,latitude){
        var iconFeature = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.transform([longitude, latitude], 'EPSG:4326',   'EPSG:3857')),
            lon: longitude,
            lat: latitude
        });
        self.vectorSource.addFeature(iconFeature);
    }

    this.addMarker = function(info){

    }

    this.updateLocation = function(longitude, latitude){
        self.map.getView().setCenter(ol.proj.transform([longitude, latitude], 'EPSG:4326', 'EPSG:3857'));
        self.longitude=longitude;
        self.latitude=latitude;
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
