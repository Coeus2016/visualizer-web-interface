import {Component, Input, Output, EventEmitter} from '@angular/core';
import {MaterializeDirective} from 'angular2-materialize';
@Component({
    selector: 'my-filter-button',
    directives: [MaterializeDirective],
    template:`
        <button class ="waves-effect waves-teal filter-small" (click)="onClick($event)" [ngClass] ="on ? 'btn-flat' : 'btn'">
            <ng-content></ng-content><i class="material-icons right">{{on ? 'close': 'add'}}</i>
        </button>`
})

export class FilterButton{
    @Input() on = true;
    @Output() onChange = new EventEmitter();
    onClick(){
        this.on = !this.on;
        this.onChange.emit(this.on);
    }
}

