import { Vehicle } from './../VehicleType/VehicleType';
import { LoadingStatus } from './../store';
import VehiclesListComponent from './VehiclesListComponent';
import { AppStore } from '../store';
import { connect, MapStateToProps } from 'react-redux';

interface Props {
    className: string;
    vehicles: Vehicle[];
    isLoading: boolean;
}

export default connect(
    ((state, ownProps) => {
        return {
            vehicles: state.vehicles.values,
            isLoading: state.vehicles.status === LoadingStatus.IN_PROGRESS,
            className: ''
        };
    }) as MapStateToProps<Props, {className: string}, AppStore>,
    undefined
)(VehiclesListComponent);
