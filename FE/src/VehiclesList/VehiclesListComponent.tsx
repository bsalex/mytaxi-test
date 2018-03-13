import React from 'react';
import classnames from 'classnames';
import { Vehicle } from '../VehicleType/VehicleType';
import VehicleService from '../VehiclesService/VehicleService';
import './VehiclesList.pcss';

interface Props {
    className: string;
    selectedVehicleId?: string;
    vehicles: Vehicle[];
    isLoading: boolean;
    selectVehicle(vehicle: Vehicle): void;
}

export default function (
    {className, vehicles, isLoading, selectVehicle, selectedVehicleId}: Props
) {
    return (
        <div className={classnames(className, 'vehicles-list')}>
            {vehicles.map((vehicle) => {
                const VehicleComponent = VehicleService.getListView(vehicle);

                return (
                    <div
                        key={vehicle.id}
                        className={
                            classnames(
                                'vehicles-list__vehicle',
                                {'vehicles-list__vehicle--selected': vehicle.id === selectedVehicleId}
                            )
                        }
                        onClick={() => selectVehicle(vehicle)}
                    >
                        <VehicleComponent {...vehicle} />
                    </div>
                );
            })}
        </div>
    );
}
