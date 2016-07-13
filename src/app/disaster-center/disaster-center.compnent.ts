import {Component} from '@angular/core';
import {DisasterCenterService} from '../services/disaster-center.service';
@Component({
    selector: 'my-disaster',
    providers: [DisasterCenterService],
    templateUrl: 'app/disaster-center/disaster-center.component.html'
})

export class DisasterCenterComponent {
    constructor(
        private service: DisasterCenterService
    ) { }
}
