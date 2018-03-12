import React from 'react';
import VehicleType, { Vehicle } from '../VehicleType/VehicleType';

class VehicleService {
    private vehicleTypes: VehicleType[] = [];

    registerVehicleType(newType: VehicleType) {
        this.vehicleTypes = this.vehicleTypes.filter((type) => type.name !== newType.name).concat(newType);
    }

    async fetchVehicles(): Promise<Vehicle[]> {
        const vehiclePromises = this.vehicleTypes.map((type) => type.loader());

        return ([] as Vehicle[]).concat(...(await Promise.all(vehiclePromises)));
    }

    getListView(vehicle: Vehicle): React.ComponentType<Vehicle> {
        const vehicleType = this.vehicleTypes.find((type) => type.name === vehicle.type);

        if (!vehicleType) {
            return () => (<div>Not registered vehicle type {vehicle.type}</div>);
        }

        return vehicleType.listView;
    }
/*
    getMapView(vehicle: Vehicle) {

    }
*/
}

export default new VehicleService();
