"use strict";

import { Component } from '@angular/core';
import {MaterializeDirective} from "angular2-materialize";
import {MapComponent} from './map/map.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';


@Component({
    moduleId: module.id,
    selector: 'my-app',
    pipes: [],
    providers: [],
    directives: [MaterializeDirective,MapComponent,LoginComponent,RegisterComponent],
    templateUrl: './app.html'
})

export class App implements OnInit{
    public Search:string = "";
    constructor(){
    }

    ngOnInit(){
        $('#autocomplete').autocomplete({
            serviceUrl: function (){
                var input = $(this)
                return 'http://photon.komoot.de/api/?q='+encodeURIComponent(input.val())+'&limit=5';
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
            }
        });
    }
}
