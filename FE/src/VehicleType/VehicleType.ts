import React from 'react';

export default interface VehicleType {
    name: string;
    listView: React.ReactElement<Vehicle>;
    loader(): Promise<Vehicle[]>;
}

export interface Vehicle {
    id: string;
    type: string;
    coordinates: {
        latitude: number;
        longitude: number;
    };
    data: any;
}