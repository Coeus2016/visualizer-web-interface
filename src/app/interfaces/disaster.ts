
export interface IDisasterType {
    name: string;
}

export interface IDisaster {
    disasterType: IDisasterType,
    isActive: boolean,
    startDate: Date,
    endDate: Date,
    location:{
        name: string,
        latitude: number,
        longitude: number
    },
    description: string
}
