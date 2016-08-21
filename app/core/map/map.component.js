angular.
module('my-app').
component('my-map', {
    template:'<div id="map"></div>',
    controller: function MapCtrl() {
        var map;
        function init(){

            map = new ol.Map({
                target: 'map',
                layers: [
                    new ol.layer.Tile({
                        source: new ol.source.OSM()
                    })
                ],
                view: new ol.View({
                    center: ol.proj.fromLonLat([0, 0]),
                    zoom: 10
                })
            });
        }
        function getMap() {
            init();
            return map.promise;
        }
    }
});
