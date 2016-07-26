export class Weather {
    City: string;
    Country: string;
    List: Object;
    constructor(response){
        //alert(response);
        this.City = response.city.name;
        this.Country = response.city.country;
        this.List = response.list;
    }
}
