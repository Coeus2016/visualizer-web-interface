import "angular2-materialize";
//import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { bootstrap } from '@angular/platform-browser-dynamic';
//import {HTTP_PROVIDERS} from '@angular/http';
import { App } from './app';
import {disableDeprecatedForms, provideForms} from '@angular/forms';
//import { APP_ROUTER_PROVIDERS } from './app.routes';


bootstrap(App, [
        disableDeprecatedForms(),
        provideForms()
    ])
    .then(
        success => console.log('App bootstrapped!'),
        error => console.log(error)
    );
