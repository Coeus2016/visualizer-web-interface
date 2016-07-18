import {Component, OnInit} from '@angular/core';

declare var ol: any;

@Component({
    selector: 'my-map',
templateUrl: 'app/map/map.component.html'
})

export class MapComponent implements OnInit{
    ol: any;
    constructor(){
    }
    ngOnInit(){
        var map = new ol.Map({
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
        this.initGeoLocation(map);
    }
    initGeoLocation(map) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                map.getView().setCenter(ol.proj.transform([position.coords.longitude, position.coords.latitude], 'EPSG:4326', 'EPSG:3857'));
            });
        }
    }
}
