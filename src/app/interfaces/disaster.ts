export interface IDisaster {
    type:string,
    isActive: boolean,
    startDate: Date,
    endDate: Date,
    location: {
        name:string,
        lon: number,
        lat: number
    },
    description: string;

}
/*
export class Wildfire extends Disaster{


}

export class Drought extends Disaster{

}

export class Flood extends Disaster{

}

export class Storm extends Disaster{

}

export class Earthquake extends Disaster{

}
*/
