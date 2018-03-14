import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import { Vehicle } from '../VehicleType/VehicleType';
import VehicleService from '../VehiclesService/VehicleService';
import './VehiclesList.pcss';

interface Props {
    className?: string;
    vehicles: Vehicle[];
    isLoading: boolean;
    selectedVehicleId?: string;
    selectVehicle(vehicle: Vehicle): void;
}

export default class VehiclesListComponent extends React.Component<Props> {
    private localSelectedVehicleId: string;

    onSelectVehicle(vehicle: Vehicle) {
        this.localSelectedVehicleId = vehicle.id;
        this.props.selectVehicle(vehicle);
    }

    componentDidUpdate(prevProps: Props) {
        if (this.props.selectedVehicleId !== this.localSelectedVehicleId) {
            const selectedVehicleIndex = this.props.vehicles.findIndex(
                (vehicle) => vehicle.id === this.props.selectedVehicleId
            );

            ReactDOM.findDOMNode(this)
            .querySelectorAll('.vehicles-list__vehicle')
            .item(selectedVehicleIndex)
            .scrollIntoView({
                behavior: 'smooth'
            });
        }
    }

    render() {
        return (
            <div className={classnames(this.props.className, 'vehicles-list')}>
                {this.props.isLoading && (<div className="app__loader" />)}
                {!this.props.isLoading && this.props.vehicles.map((vehicle) => {
                    const VehicleComponent = VehicleService.getListView(vehicle);

                    return (
                        <div
                            key={vehicle.id}
                            className={
                                classnames(
                                    'vehicles-list__vehicle',
                                    {'vehicles-list__vehicle--selected': vehicle.id === this.props.selectedVehicleId}
                                )
                            }
                            onClick={() => this.onSelectVehicle(vehicle)}
                        >
                            <VehicleComponent {...vehicle} />
                        </div>
                    );
                })}
            </div>
        );
    }
}
