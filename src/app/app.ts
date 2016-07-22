"use strict";

import { Component } from '@angular/core';
import {MaterializeDirective} from "angular2-materialize";
import {MapComponent} from './map/map.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {DisasterCenterComponent} from './disaster-center/disaster-center.compnent';


@Component({
    moduleId: module.id,
    selector: 'my-app',
    pipes: [],
    providers: [],
    directives: [MaterializeDirective,MapComponent,LoginComponent,RegisterComponent, DisasterCenterComponent],
    templateUrl: './app.html'
})

export class App{

}
