import { Injectable } from '@angular/core';
declare var ol: any;
//declare var map: any;
@Injectable()
export class MapService {
    ol: any;
    map: any;
    
    getMap(){
         this.map = new ol.Map({
            target: 'map',
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM()
                })
            ],
            view: new ol.View({
                center: ol.proj.fromLonLat([28.2293, -25.7479]),
                zoom: 10
            })
        });
        return {
            map: this.map
        }

    }

    addLayer(layer: any){
        this.map.addLayer(layer);
        //Promise.resolve(LAYERS)

    }


}
