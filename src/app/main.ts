import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { bootstrap } from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS} from '@angular/http';
import { App } from './app';
import { APP_ROUTER_PROVIDERS } from './app.routes';


bootstrap(App, [HTTP_PROVIDERS,APP_ROUTER_PROVIDERS, { provide: LocationStrategy, useClass: HashLocationStrategy }])
    .then(
        success => console.log('App bootstrapped!'),
        error => console.log(error)
    );
