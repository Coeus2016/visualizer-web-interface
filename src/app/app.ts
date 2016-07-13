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

}
