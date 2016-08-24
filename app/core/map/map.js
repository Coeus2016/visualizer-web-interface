'use strict';
angular.module('my-app.my-map',[

]).
controller('MapCtrl', MapCtrl);

function MapCtrl ($scope) {
    angular.element(document).ready(function () {
        $scope.map.updateSize();
    });

    var markerLayer = null;

    var iconStyle = new ol.style.Style({
        image: new ol.style.Icon ({
            anchor: [0.5, 1],

            src: 'http://openlayers.org/en/v3.17.1/examples/data/icon.png'
        })
    });
    var layer = new ol.layer.Tile({
        source: new ol.source.OSM()
    });

    var view = new ol.View({
        center:ol.proj.fromLonLat([0,0]),
        zoom: 10,
        minZoom: 3,
        maxZoom: 15
    });

    function updateUserLocation() {
        var geo = null;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                //geo = position;
                $scope.map.getView().setCenter(ol.proj.transform([position.coords.longitude, position.coords.latitude], 'EPSG:4326', 'EPSG:3857'));
            });
        }
        if (markerLayer)
            $scope.map.removeLayer(markerLayer);

        markerLayer = new ol.layer.Vector({
            source: new ol.source.Vector({
                feature: new ol.Feature({
                    type: 'icon',
                    geometry: new ol.geom.Point([0,0])
                })
            }),
            style:iconStyle
        });


        $scope.map.addLayer(markerLayer);
    }

    function addLayer(info){

    }

    function addMarker(info){

    }

    $scope.map= new ol.Map({
        target: 'map'
    });

    $scope.map.setView(view);

    $scope.map.addLayer(layer);

    updateUserLocation();
}
