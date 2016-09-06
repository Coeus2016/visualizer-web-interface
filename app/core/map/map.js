'use strict';

var myMap = angular.module('my-app.my-map',[]);

myMap.service('MapService',function(){
    var self = this;
    this.longitude = 0;
    this.latitude = 0;

    this.map = L.map('map',{
        'worldCopyJump': true
    });

    this.map.locate({
        setView: true,
        maxZoom: 2
    });

    this.markers = L.markerClusterGroup();
    this.map.addLayer(this.markers);

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
        minZoom: 2,
        maxZoom: 15
    }).addTo(this.map);

    this.addLayer = function(longitude,latitude){
        this.markers.addLayer(L.marker([latitude,longitude]));
    };


    this.updateLocation = function(longitude, latitude){
        this.map.panTo(new L.LatLng(latitude,longitude));
        self.longitude=longitude;
        self.latitude=latitude;
    };

    this.addEarthLayer =  function(result){

        //console.log(result.data.length);
       for( var i = 0; i < result.data.length; i++){
            //console.log(result.data[i].geometry.coordinates[0]);
            this.addLayer(result.data[i].geometry.coordinates[0],result.data[i].geometry.coordinates[1]);
       }

    };
    this.removeEarthLayer =  function(){

    };

    this.addFireLayer =  function(result){

        //console.log(result.data.length);
        for( var i = 0; i < result.data.length; i++){
            this.addLayer(result.data[i].longitude,result.data[i].longitude);
        }

    };
    this.removeFireLayer =  function(){

    };


});

myMap.controller('MapCtrl', MapCtrl);

function MapCtrl ($scope,MapService) {

}
