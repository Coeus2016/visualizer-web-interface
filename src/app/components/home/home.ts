import { Component } from '@angular/core';
import {Map} from './map/map';
//import {MaterializeDirective} from 'angular2-materialize';


@Component({
    moduleId: module.id,
    selector: 'my-home',
    pipes: [],
    providers: [],
    directives: [Map],
    templateUrl: './home.html',
    styleUrls: ['home.css']
})

export class Home {
    constructor(){

    }

    ngOnInit(){}
}
