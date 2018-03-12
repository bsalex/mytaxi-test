import React from 'react';
import { Vehicle } from '../VehicleType/VehicleType';
import { Car2GoVehicleData } from './Car2GoVehicleType';

interface Car2GoVehicle extends Vehicle {
    data: Car2GoVehicleData;
}

export default function (vehicle: Car2GoVehicle) {
    return (
        <div className="vehicle-list-item">
            <div className="vehicle-list-item__title">
                Car 2 Go {vehicle.data.name}
            </div>
            <div className="vehicle-list-item__details">
                Address: {vehicle.data.address}
            </div>
        </div>
    );
}
