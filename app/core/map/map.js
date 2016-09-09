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

    var redMarker = L.WeatherMarkers.icon({
        icon: 'fire',
        markerColor: 'red'
    });

    this.addLayer = function(longitude,latitude,data){
        var mark = L.marker([latitude,longitude],{icon: redMarker});
        mark.mydata = data;
        this.markers.addLayer(mark);
    }

    this.updateLocation = function(longitude, latitude){
        this.map.panTo(new L.LatLng(latitude,longitude));
        self.longitude=longitude;
        self.latitude=latitude;
    }

    this.setEarth = function(DisasterService){
        this.map.eachLayer(function(layer){     //iterate over map rather than clusters
            if (layer.getChildCount){         // if layer is markerCluster
                //console.log(layer.getLatLng());
                //console.log(layer.getLatLng());
                //if (self.map.getBounds().contains(layer.getLatLng()))
                   // console.log(layer._childCount);

                //if (self.map.getBounds().contains(layer.getLatLng()))
                
                //console.log(visibleOne._childCount);
                  // return count of points within each cluster
             //     console.log(marker._childCount);
            }
            else if (layer instanceof L.Marker){
                if (self.map.getBounds().contains(layer.getLatLng()))
                    DisasterService.fire.push(layer.mydata);
            }
        });
    }
});

myMap.controller('MapCtrl', MapCtrl);

function MapCtrl ($scope,MapService,DisasterService) {
    MapService.map.on('moveend', function() {
        while (DisasterService.fire.length > 0) {
            DisasterService.fire.pop();
        }

        MapService.setEarth(DisasterService);
    });
}
