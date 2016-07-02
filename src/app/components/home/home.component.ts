import { Component } from '@angular/core';

//import {MapComponent} from './map/map.component';


@Component({
    selector: 'my-home',
    template: require('./home.component.html'),
    styles: [require('./home.component.css')],
    directives: [
       // MapComponent
    ]
})

export class HomeComponent { }
