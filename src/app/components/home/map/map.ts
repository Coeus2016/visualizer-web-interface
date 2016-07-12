import {Component, OnInit} from '@angular/core';

declare var ol: any;

@Component({
    selector: 'my-map',
template: `<div id="map" class="map"></div>`
})

export class Map implements OnInit{
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
                center: ol.proj.fromLonLat([37.41, 8.82]),
                zoom: 10
            })
        });
    }
}