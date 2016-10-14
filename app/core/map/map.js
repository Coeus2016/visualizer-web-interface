'use strict';

var myMap = angular.module('my-app.my-map',[]);

myMap.service('MapService',function(){
    var self = this;
    this.longitude = 0;
    this.latitude = 0;
    this.markersList = [];

    this.map = L.map('map',{
        'worldCopyJump': true
    });

    this.markers = L.markerClusterGroup({
        iconCreateFunction: function(cluster) {
            // get the number of items in the cluster
            var count = cluster.getChildCount();

            // figure out how many digits long the number is
            var digits = (count+'').length;

            // return a new L.DivIcon with our classes so we can
            // style them with CSS. Take a look at the CSS in
            // the <head> to see these styles. You have to set
            // iconSize to null if you want to use CSS to set the
            // width and height.
            return new L.divIcon({
                html: count,
                className:'cluster digits-'+digits,
                iconSize: null
            });
        }
    });

    this.map.addLayer(this.markers);

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
        minZoom: 2,
        maxZoom: 15
    }).addTo(this.map);

    var earthquakeMarker = L.WeatherMarkers.icon({
        icon: 'earthquake',
        markerColor: 'orange'
    });

    var fireMarker = L.WeatherMarkers.icon({
        icon: 'fire',
        markerColor: 'red'
    });

    this.addEarth = function(longitude,latitude,data){
        var mark = L.marker([latitude,longitude],{icon: earthquakeMarker});
        mark.mydata = data;
        mark.what = "earthquake";

        mark.bindPopup("Earthquake");
        mark.on('mouseover', function (e) {
            this.openPopup();
        });
        mark.on('mouseout', function (e) {
            this.closePopup();
        });

        this.markers.addLayer(mark);
    }

    this.addFire = function(longitude,latitude){
        var mark = L.marker([latitude,longitude],{icon: fireMarker});
        mark.what = "fire";

        mark.bindPopup("Fire");
        mark.on('mouseover', function (e) {
            this.openPopup();
        });
        mark.on('mouseout', function (e) {
            this.closePopup();
        });

        this.markers.addLayer(mark);
    }

    this.addMarker = function(longitude,latitude,name){
        var mark = L.marker([latitude,longitude]);
        mark.what = "searched";

        mark.bindPopup(name);
        mark.on('click', function (e) {
            this.openPopup();
        });
        mark.on('mouseover', function (e) {
            this.openPopup();
        });
        mark.on('mouseout', function (e) {
            this.closePopup();
        });

        this.markersList.push(mark);
        this.markers.addLayer(mark);
    }

    this.mapClick = function(index){
        this.markersList[index].openPopup(this.markersList[index].getLatLng());
    }

    this.mapClickClose = function(index){
        this.markersList[index].closePopup(this.markersList[index].getLatLng());
    }

    this.removeMarker = function(){
        while(this.markersList.length>0){
            this.markersList.pop();
        }

        this.markers.eachLayer(function(marker){
            if ((marker instanceof L.Marker) && (marker.what =="searched"))
                self.markers.removeLayer(marker);
        });
    }

    this.removeFire = function(){
        this.markers.eachLayer(function(marker){
            if ((marker instanceof L.Marker) && (marker.what =="fire"))
                self.markers.removeLayer(marker);
        });
    }

    this.removeEarth = function(){
        this.markers.eachLayer(function(marker){
            if ((marker instanceof L.Marker) && (marker.what =="earthquake"))
                self.markers.removeLayer(marker);
        });
    }

    this.updateLocation = function(longitude, latitude){
        this.map.panTo(new L.LatLng(latitude,longitude));
        this.map.setZoom(5);
        self.longitude=longitude;
        self.latitude=latitude;
    }

    this.setEarth = function(DisasterService){
        this.map.eachLayer(function(layer){
            if (layer.getChildCount){
            }
            else if ((layer instanceof L.Marker) && (typeof layer.mydata!=="undefined")){
                if (self.map.getBounds().contains(layer.getLatLng()))
                    DisasterService.earth.push(layer.mydata);
            }
        });
    }
});

myMap.controller('MapCtrl', MapCtrl);

function MapCtrl ($scope,MapService,DisasterService,$timeout,store) {
    MapService.map.locate({
        setView: true,
        maxZoom: 5,
        watch: true
    }).on('locationfound',function(e){
        store.set('latitude',e.latitude);
        store.set('longitude',e.longitude);
    }).on('locationerror',function(e){
        store.set('latitude',0);
        store.set('longitude',0);
    });

    /*MapService.map.on('moveend', function() {
        $timeout(function(){
            DisasterService.clearEarth();
            MapService.setEarth(DisasterService);
        },500);
    });*/
}
