import { Injectable } from '@angular/core';
import {IDisasterType} from '../interfaces/disaster';
import {DISASTERS} from "../mocks/mock-disaster";

@Injectable()
export class DisasterCenterService {
    
    /**
     * Takes in DisasterType array, creates new layer and addes it to map
     * @param id
     */
    getDisastersByType(types:IDisasterType[]){
        //Call the backend service which returns list of disasters here and return as promise
        return Promise.resolve(DISASTERS);
    }

    /**
     *
     * @param id
     */
    getDisasters(id: string){
        //Call the backend service which returns list of disasters here and return as promise
        return Promise.resolve(DISASTERS);
    }
}
