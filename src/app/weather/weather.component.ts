import {Component} from '@angular/core';
import {Http, HTTP_PROVIDERS} from '@angular/http';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {Weather} from './weather';
import {MaterializeDirective} from "angular2-materialize";

@Component({
    selector: 'my-weather',
    templateUrl: 'app/weather/weather.component.html',
    directives: [MaterializeDirective]
})

export class WeatherComponent {
    weathers:Array<Weather> = [];
    constructor(private http: Http){
        var self = this;
        http.get('app/weather.json').map(function(response) {
            let tmp:Weather = new Weather(response.json());
            self.weathers.push(tmp);
            for (var i=0; i<tmp.List.length; i++)
            console.log(new Date(tmp.List[i].dt*1000));
        }).subscribe(data=>this.data = data, err=>console.log(err),()=>console.log("Data received"));
    }
    addWeather(event){

    }
    removeWeather(index){

    }
}
