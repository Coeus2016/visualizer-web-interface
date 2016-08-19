import {Component, OnInit} from '@angular/core';
//import {MapService} from "../services/map.service";

declare var ol:any;
@Component({
    selector: 'my-map',
    //providers: [MapService],
    templateUrl: 'app/map/map.component.html'
})

export class MapComponent implements OnInit{
    ol: any;


    map: Object;
    markerLayer: Object;
    vectorSource: Object;
    lon: number;
    lat: number;

    constructor(/*private _mapService: MapService*/){
       this.lon = 0.0;
        this.lat = 0.0;

        this.vectorSource = new ol.source.Vector({
            //create empty vector
        });

        //create the style
        var iconStyle = new ol.style.Style({
            image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
                anchor: [0.5, 46],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                opacity: 0.75,
                src: 'public/images/location.png'
            }))
        });

        var self = this;
        this.markerLayer = new ol.layer.Vector({
            source: self.vectorSource,
            style: iconStyle
        });
    }
    ngOnInit(){

        //this._mapService.getMap().then(()=> this.map);
        //this._mapService();
        this.map = new ol.Map({
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
     //   this.map.addLayer(this.markerLayer);


        var container = document.getElementById('popup');
        var content = document.getElementById('popup-content');
        var closer = document.getElementById('popup-closer');

        var element = document.getElementById('popup');

        var popup = new ol.Overlay({
            element: container,
            autoPan: true,
            autoPanAnimation: {
                duration: 250
            }
        });
     //   this.map.addOverlay(popup);

        closer.onclick = function() {
            popup.setPosition(undefined);
            closer.blur();
            return false;
        };

        var self = this;
        // display popup on click
       /* this.map.on('click', function(evt) {
            var feature = self.map.forEachFeatureAtPixel(evt.pixel,
                function(feature, layer) {
                    return feature;
                }
            );
            if (feature) {
                var geometry = feature.getGeometry();
                var coord = geometry.getCoordinates();
                content.innerHTML = '<div class="row"><a class="waves-effect waves-light btn">button</a></div><div class="row"><a class="waves-effect waves-light btn">button</a></div>';
                popup.setPosition(coord);
                console.log(feature.get('lat'));
                $(element).popover({
                    'placement': 'top',
                    'html': true,
                    'content': feature.get('name')
                });
                $(element).popover('show');
            } else {
                $(element).popover('destroy');
            }
        });*/
    }
   initGeoLocation(map:any) {
       var self = this;
       if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                self.lat = position.coords.latitude;
                self.lon = position.coords.longitude;
                map.getView().setCenter(ol.proj.transform([position.coords.longitude, position.coords.latitude], 'EPSG:4326', 'EPSG:3857'));
            });
        }
    }

   newLocation(longitude:any, latitude:any){
       var iconFeature = new ol.Feature({
            geometry: new
                ol.geom.Point(ol.proj.transform([longitude, latitude], 'EPSG:4326',   'EPSG:3857')),
            lon: longitude,
            lat: latitude
        });
        //this.vectorSource.addFeature(iconFeature);


        this.lat = latitude;
        this.lon = longitude;

        var duration = 2000;
        var start = +new Date();
        /*var pan = ol.animation.pan({
            duration: duration,
            source: (this.map.getView().getCenter()),
            start: start
        });
        var bounce = ol.animation.bounce({
            duration: duration,
            resolution: 4*this.map.getView().getResolution(),
            start: start
        });*
        this.map.beforeRender(pan,bounce);

        this.map.getView().setCenter(ol.proj.fromLonLat([longitude, latitude]));*/
    }
}
