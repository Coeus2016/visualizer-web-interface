import {Component, OnInit} from '@angular/core';
import {DisasterCenterService} from '../services/disaster-center.service'
import {MaterializeDirective} from 'angular2-materialize';
import {MapService} from '../services/map.service';
import {FilterButton} from '../directives/filter-button.directive';
import {Disaster} from './disaster';
@Component({
    selector: 'my-disaster',
    providers: [MapService, DisasterCenterService],
    directives: [MaterializeDirective, FilterButton],
    templateUrl: 'app/disaster-center/disaster-center.component.html'
})

export class DisasterCenterComponent implements OnInit{

    private disasterLayer: any;
    disasters:string[]= [];
    //showingDisasters: string[] = ['drought', 'wildfire', 'flood', 'storm', 'earthquake'];
    showingDisasters: Disaster[] = [
        {name:'Drought',isShowing: true},
        {name:'Wildfire',isShowing: true},
        {name:'Floods',isShowing: true},
        {name:'Storm',isShowing: true},
        {name:'Earthquake',isShowing: true}];
    constructor(
        private _mapService: MapService,
        private _disasterCenterService: DisasterCenterService
    ) { }

    ngOnInit(){

    }   

    getDisastersByType(){
        alert("works");
        //this.disaster_type = "works";
       // var markers = [];
        //this._disasterCenterService.getDisastersByType(this.selectedTypes).then((disasters:IDisaster)=> this.disasters);

        //do something with the new list of disasters
//        for(i in this.disasters){

        //}

        //this._mapService.addLayer(this.disasterLayer);

    }


}
