'use strict';

var myMap = angular.module('my-app.my-map',[]);

myMap.service('MapService',function(){
    var self = this;
    this.longitude = 0;
    this.latitude = 0;

    this.map = L.map('map');

    this.map.locate({
        setView: true,
        maxZoom: 10
    });

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
        maxZoom: 15,
        minZoom: 3
    }).addTo(this.map);

//  L.marker([51.930454,4.527054], {icon: L.AwesomeMarkers.icon({icon: 'group', prefix: 'fa', markerColor: 'darkred'}) }).addTo(this.map);

    /*this.layer = new ol.layer.Tile({
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
        text: new ol.style.Text({
            text: '\uf041',
            font: 'normal 24px FontAwesome',
            textBaseline: 'Bottom',
            fill: new ol.style.Fill({
                color: '#9E9D24',
            })
        })
    });

    
    this.markerLayer = new ol.layer.Vector({
        source: self.vectorSource,
        style: self.iconStyle
    });

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

    }*/

    this.updateLocation = function(longitude, latitude){
        this.map.panTo(new L.LatLng(latitude,longitude));
        self.longitude=longitude;
        self.latitude=latitude;
    }
});

myMap.controller('MapCtrl', MapCtrl);

function MapCtrl ($scope,MapService) {

}
