import {inject} from '@angular/core/testing';
import {Router} from "@angular/router";
import { AppComponent } from './app.component'

describe('App', () => {
    let router: Router;
    let component: AppComponent;
    var location: any;


    beforeAll(() => {
        router = jasmine.createSpyObj('Router', ['navigateByUrl']);
        component = new AppComponent();
        location = jasmine.createSpyObj('location', ['url']);

    });

    it ('Should be defined', () => {
        expect(component).toBeDefined();
    });
/*
    it('Should be able to navigate to Home', done => {
        router.navigateByUrl('/').then(() => {
            expect(location.url).toBe('/');
            done();
        }).catch(e => done.fail(e));
    });

    it('Should be able to navigate to About', done => {
        router.navigateByUrl('/about').then(() => {
            expect(location.url).toBe('/home');
            done();
        }).catch(e => done.fail(e));
    });*/

});