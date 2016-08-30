'use strict';

var myMap = angular.module('my-app.my-map',[]);

myMap.service('MapService',function(){
    this.map = new ol.Map({
        target: 'map'
    });

    this.layer = new ol.layer.Tile({
        source: new ol.source.OSM()
    });
    this.earthquakeLayer = new ol.source.Vector({

    });

    this.fireLayer = new ol.source.Vector({

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

    this.fireIcon = new ol.style.Style({
        image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
            anchor: [0.5, 46],
            scale: 0.5,
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            opacity: 0.75,
            src: 'public/images/disasters/1.png'
        }))
    });

    this.earthIcon = new ol.style.Style({
        image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
            anchor: [0.5, 46],
            scale: 0.5,
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            opacity: 0.75,
            src: 'public/images/disasters/2.png'
        }))
    });



    var self = this;

    this.markerFire = new ol.layer.Vector({
        source: self.fireLayer,
        style: self.fireIcon
    });
    this.markerEarthquake = new ol.layer.Vector({
        source: self.earthquakeLayer,
        style: self.earthIcon
    });
    this.markerLayer = new ol.layer.Vector({
        source: self.vectorSource,
        style: self.iconStyle
    });

    this.map.setView(this.view);

    this.map.addLayer(this.layer);

    this.map.addLayer(this.markerLayer);
    this.removeFireLayer = function(){
        this.map.removeLayer(this.markerFire);
    };

    this.addFireLayer = function(result ) {
        for (var i = 0; i < result.data.length; i++) {

            var iconFeature = new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.transform([ result.data[i].longitude, result.data[i].latitude], 'EPSG:4326', 'EPSG:3857')),
                lon: result.data[i].longitude,
                lat: result.data[i].latitude
            });
            self.fireLayer.addFeature(iconFeature);
        }

        this.map.addLayer(this.markerFire);
    };

    this.removeEarthLayer = function(){
        this.map.removeLayer(this.markerEarthquake);
    };
    this.addEarthLayer = function(result ) {



            for (var i = 0; i < result.data.length; i++) {

                var iconFeature = new ol.Feature({
                    geometry: new ol.geom.Point(ol.proj.transform([ result.data[i].geometry.coordinates[0], result.data[i].geometry.coordinates[1]], 'EPSG:4326', 'EPSG:3857')),
                    lon: result.data[i].geometry.coordinates[0],
                    lat: result.data[i].geometry.coordinates[1]
                });
                self.earthquakeLayer.addFeature(iconFeature);
            }

            this.map.addLayer(this.markerEarthquake);





    };

    this.addLayer = function(longitude,latitude){
        var iconFeature = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.transform([longitude, latitude], 'EPSG:4326',   'EPSG:3857')),
            lon: longitude,
            lat: latitude
        });
        self.vectorSource.addFeature(iconFeature);
    };

    this.addMarker = function(info){

    };

    this.updateLocation = function(longitude, latitude){
        self.map.getView().setCenter(ol.proj.transform([longitude, latitude], 'EPSG:4326', 'EPSG:3857'));
        self.map.getView().setZoom(11);

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
