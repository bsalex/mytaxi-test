import { AppStore } from './../store';
import vehiclesService from '../VehiclesService/VehicleService';
import * as actionTypes from './AppActionTypes';
import { Vehicle } from '../VehicleType/VehicleType';
import { ThunkAction } from 'redux-thunk';

export interface RequestVehicles {
    type: actionTypes.REQUEST_VEHICLES;
}

export interface ReceiveVehicles {
    type: actionTypes.RECEIVE_VEHICLES;
    payload: Vehicle[];
}

export interface RejectVehicles {
    type: actionTypes.REJECT_VEHICLES;
    payload: Error;
}

export interface SelectVehicle {
    type: actionTypes.SELECT_VEHICLE;
    payload: Vehicle;
}

export interface FetchVehicles extends ThunkAction<void, AppStore, void> {}

export type AppAction = SelectVehicle | RequestVehicles | ReceiveVehicles | RejectVehicles;

function requestVehicles(): RequestVehicles {
    return {
        type: actionTypes.REQUEST_VEHICLES
    };
}

function receiveVehicles(vehicles: Vehicle[]): ReceiveVehicles {
    return {
        type: actionTypes.RECEIVE_VEHICLES,
        payload: vehicles
    };
}

function rejectVehicles(e: Error): RejectVehicles {
    return {
        type: actionTypes.REJECT_VEHICLES,
        payload: e
    };
}

export function fetchVehicles(): FetchVehicles {
    return async (dispatch) => {
        dispatch(requestVehicles());

        try {
            const vehicles = await vehiclesService.fetchVehicles();
            dispatch(receiveVehicles(vehicles));
        } catch (e) {
            dispatch(rejectVehicles(e));
        }
    };
}

export function selectVehicle(vehicle: Vehicle): SelectVehicle {
    return {
        type: actionTypes.SELECT_VEHICLE,
        payload: vehicle
    };
}
