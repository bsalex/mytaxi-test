import { Vehicle } from './../VehicleType/VehicleType';
import { LoadingStatus } from './../store';
import VehiclesListComponent from './VehiclesListComponent';
import { AppStore } from '../store';
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';
import * as appActions from '../App/AppActions';

interface OwnProps {
    className?: string;
}

interface StateProps extends OwnProps {
    vehicles: Vehicle[];
    isLoading: boolean;
    selectedVehicleId?: string;
}

interface DispatchProps {
    selectVehicle(vehicle: Vehicle): void;
}

export default connect(
    ((state, ownProps) => {
        return {
            vehicles: state.vehicles.values,
            isLoading: state.vehicles.status === LoadingStatus.IN_PROGRESS,
            className: ownProps.className,
            selectedVehicleId: state.selectedVehicleId
        };
    }) as MapStateToProps<StateProps, {className: string}, AppStore>,
    ((dispatch) => {
        return {
            selectVehicle(vehicle: Vehicle) {
                dispatch(appActions.selectVehicle(vehicle));
            }
        };
    }) as MapDispatchToProps<DispatchProps, OwnProps>
)(VehiclesListComponent);
