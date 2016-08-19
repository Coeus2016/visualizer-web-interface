import { Injectable, ViewChild } from '@angular/core';
import { Headers, Http } from '@angular/http';
import {MapComponent} from '../map/map.component';

@Injectable()
export class DisasterCenterService {
    @ViewChild(MapComponent) map:MapComponent;
    //private disastersUrl = 'app/heroes';

    /**
     *
     * @param http
     */
    constructor(private http: Http) { }
    /**
     * Takes in DisasterType array, creates new layer and addes it to map
     * @param id
     */
    getDisastersByType(){
        /*return this.http.get(this.heroesUrl)
            .toPromise()
            .then(response => response.json().data as Hero[])
            .catch(this.handleError);*/


    }


    /**
     *
     * @param id
     */
    getDisasters(id: string){
        //Call the backend service which returns list of disasters here and return as promise
      //  return Promise.resolve(DISASTERS);
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
