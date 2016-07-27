"use strict";

import {Component,ViewChild} from '@angular/core';
import {MaterializeDirective} from "angular2-materialize";
import {MapComponent} from './map/map.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {DisasterCenterComponent} from './disaster-center/disaster-center.compnent';
import {WeatherComponent} from './weather/weather.component';


@Component({
    moduleId: module.id,
    selector: 'my-app',
    pipes: [],
    providers: [],
    directives: [MaterializeDirective,MapComponent,LoginComponent,RegisterComponent, DisasterCenterComponent, WeatherComponent],
    templateUrl: './app.html'
})

export class App implements OnInit{
    @ViewChild(MapComponent) map:MapComponent;

    public Search:string = "";
    constructor(){
    }
    ngAfterViewInit() {

    }

    temp(){
        console.log(this.map+"xyz");
    }

    ngOnInit(){
        var self = this;
        $('#autocomplete').autocomplete({
            serviceUrl: function (){
                var input = $(this);
                return 'http://photon.komoot.de/api/?q='+encodeURIComponent(input.val())+'&limit=5&lat='+self.map.lat+'&lon='+self.map.lon;
            },
            transformResult: function(response) {
                var x = JSON.parse(response);
                return {
                    suggestions: $.map(x.features, function(dataItem) {
                        var temp="";
                        if (typeof dataItem.properties.name!=="undefined")
                            temp+=dataItem.properties.name+", ";
                        if (typeof dataItem.properties.osm_value!=="undefined")
                            temp+=dataItem.properties.osm_value+", ";
                        if (typeof dataItem.properties.city!=="undefined")
                            temp+=dataItem.properties.city+", ";
                        if (typeof dataItem.properties.country!=="undefined")
                            temp+=dataItem.properties.country;

                        return {value: temp, data: dataItem};
                    })
                };
            },
            onSelect: function (suggestion) {
                self.map.newLocation(suggestion.data.geometry.coordinates[0],suggestion.data.geometry.coordinates[1]);
            },
            formatResult: function (suggestion, currentValue)
            {
                return ("<h6 style='margin: 0; padding: 0;font-weight: bold;'>"+suggestion.data.properties.name+"</h6><h6 style='margin: 0; padding: 0'>"+suggestion.value+"</h6>");
            }
        });
        document.body.style.overflow = 'hidden';
    }
}
