import React from 'react';
import { Vehicle } from '../VehicleType/VehicleType';
import { MyTaxiVehicleData } from './MyTaxiVehicleType';
import './MyTaxiVehicleType.pcss';

interface MyTaxiVehicle extends Vehicle {
    data: MyTaxiVehicleData;
}

export default function (vehicle: MyTaxiVehicle) {
    return (
        <div className="vehicle-list-item my-taxi-vehicle-list-item">
            <div className="vehicle-list-item__title">
                MyTaxi {vehicle.data.type} {vehicle.data.id}
            </div>
            <div className="vehicle-list-item__details">
                Status: {' '}
                <span
                    className={`
                        my-taxi-vehicle-list-item__status
                        my-taxi-vehicle-list-item__status--${vehicle.data.state.toLowerCase()}
                    `}
                >
                    {vehicle.data.state}
                </span>
            </div>
        </div>
    );
}
