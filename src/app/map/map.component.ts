import {Component, OnInit} from '@angular/core';
import {MapService} from "../services/map.service";


@Component({
    selector: 'my-map',
    providers: [MapService],
    templateUrl: 'app/map/map.component.html'
})

export class MapComponent implements OnInit{
    ol: any;
    constructor(private _mapService: MapService){
    }
    ngOnInit(){
        this._mapService.getMap();
    }
}
