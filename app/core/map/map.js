'use strict';

var myMap = angular.module('my-app.my-map',[]);

myMap.service('MapService',function(){
    var self = this;
    this.longitude = 0;
    this.latitude = 0;

    this.map = L.map('map');
    this.markers = L.markerClusterGroup();
    this.map.addLayer(this.markers);

    this.map.locate({
        setView: true,
        maxZoom: 10
    });

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
        maxZoom: 15,
        minZoom: 3
    }).addTo(this.map);

    this.addLayer = function(longitude,latitude){
        this.markers.addLayer(L.marker([latitude, longitude]).addTo(this.map));
    }

    this.updateLocation = function(longitude, latitude){
        this.map.panTo(new L.LatLng(latitude,longitude));
        self.longitude=longitude;
        self.latitude=latitude;
    }
});

myMap.controller('MapCtrl', MapCtrl);

function MapCtrl ($scope,MapService) {

}
