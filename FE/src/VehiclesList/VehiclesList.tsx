import React from 'react';
import classnames from 'classnames';
import { Vehicle } from '../VehicleType/VehicleType';
import VehicleService from '../VehiclesService/VehicleService';
import './VehiclesList.pcss';

interface Props {
    className: string;
    vehicles: Vehicle[];
    isLoading: boolean;
}

export default function (
    {className, vehicles, isLoading}: Props
) {
    return (
        <div className={classnames(className, 'vehicles-list')}>
            {vehicles.map((vehicle) => {
                const VehicleComponent = VehicleService.getListView(vehicle);

                return (<VehicleComponent key={vehicle.id} {...vehicle} />);
            })}
        </div>
    );
}
