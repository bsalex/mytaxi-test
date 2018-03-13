import React from 'react';
import { Vehicle } from '../VehicleType/VehicleType';
import { MyTaxiVehicleData } from './MyTaxiVehicleType';

interface MyTaxiVehicle extends Vehicle {
    data: MyTaxiVehicleData;
}

export default function (vehicle: MyTaxiVehicle) {
    return (
        <div className="vehicle-list-item">
            <div className="vehicle-list-item__title">
                MyTaxi {vehicle.data.type} {vehicle.data.id}
            </div>
            <div className="vehicle-list-item__details">
                Status: {vehicle.data.state}
            </div>
        </div>
    );
}
