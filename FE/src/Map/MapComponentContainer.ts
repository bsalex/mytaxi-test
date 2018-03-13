import { Vehicle } from './../VehicleType/VehicleType';
import { LoadingStatus } from './../store';
import MapComponent from './MapComponent';
import { AppStore } from '../store';
import { connect, MapStateToProps } from 'react-redux';

interface OwnProps {
    className: string;
}

interface StateProps extends OwnProps {
    vehicles: Vehicle[];
    isLoading: boolean;
    selectedVehicleId?: string;
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
    undefined
)(MapComponent);
