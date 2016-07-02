"use strict";

import { Component } from '@angular/core';
import {ROUTER_DIRECTIVES } from '@angular/router';

//CSS
import '../../public/css/styles.css';
import {MaterializeDirective } from 'angular2-materialize';

@Component({
    selector: 'my-app',
    template: require('./app.component.html'),
    styles: [require('./app.component.css')],
    providers:[

    ],
    directives:[
        ROUTER_DIRECTIVES,
        MaterializeDirective
    ]
})

export class AppComponent {

}
