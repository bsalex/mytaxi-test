import { LoadingStatus } from './../store';
import { AppAction } from './AppActions';
import { AppStore } from '../store';
import * as actionTypes from './AppActionTypes';

export default function (
    state: AppStore,
    action: AppAction
): AppStore {
    switch (action.type) {
        case actionTypes.SELECT_VEHICLE:
            return {
                ...state,
                selectedVehicleId: action.payload.id
            };
        case actionTypes.REQUEST_VEHICLES:
            return {
                ...state,
                vehicles: {
                    ...state.vehicles,
                    status: LoadingStatus.IN_PROGRESS
                }
            };
        case actionTypes.RECEIVE_VEHICLES:
            return {
                ...state,
                vehicles: {
                    values: action.payload,
                    status: LoadingStatus.SUCCESS
                }
            };
        case actionTypes.REJECT_VEHICLES:
            return {
                ...state,
                vehicles: {
                    values: [],
                    status: LoadingStatus.FAILED
                }
            };
        default:
            return state;
    }
}
