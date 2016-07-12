"use strict";

import { Component } from '@angular/core';
import {ROUTER_DIRECTIVES } from '@angular/router';
import {MaterializeDirective} from "angular2-materialize";


@Component({
    moduleId: module.id,
    selector: 'my-app',
    pipes: [],
    providers: [],
    directives: [MaterializeDirective,ROUTER_DIRECTIVES],
    templateUrl: './app.html'
})

export class App implements OnInit{

}
