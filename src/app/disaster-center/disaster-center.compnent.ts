import {Component} from '@angular/core';
import {DisasterCenterService} from '../services/disaster-center.service'
import {MaterializeDirective} from 'angular2-materialize';
import {MapService} from "../services/map.service";
import {IDisasterType, IDisaster} from "../interfaces/disaster";
@Component({
    selector: 'my-disaster',
    providers: [MapService, DisasterCenterService],
    directives: [MaterializeDirective],
    templateUrl: 'app/disaster-center/disaster-center.component.html'
})

export class DisasterCenterComponent {
    private disaster_type="all";
    private disasters:IDisaster[];
    private disasterLayer: any;
    constructor(
        private _mapService: MapService,
        private _disasterCenterService: DisasterCenterService
    ) { }

    getDisastersByType(){
        //this.disaster_type = "works";
       // var markers = [];
        //this._disasterCenterService.getDisastersByType(this.selectedTypes).then((disasters:IDisaster)=> this.disasters);

        //do something with the new list of disasters
//        for(i in this.disasters){

        //}

        //this._mapService.addLayer(this.disasterLayer);

    }


}
