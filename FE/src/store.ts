import { Vehicle } from './VehicleType/VehicleType';
import { createStore, applyMiddleware } from 'redux';
import appReducer from './App/AppReducer';
import reduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

export enum LoadingStatus {
    NOT_STARTED,
    IN_PROGRESS,
    SUCCESS,
    FAILED
}

export interface AppStore {
    vehicles: {
        status: LoadingStatus;
        values: Vehicle[];
    };
}

export default createStore<AppStore>(
    appReducer,
    {
        vehicles: {
            status: LoadingStatus.NOT_STARTED,
            values: []
        }
    },
    applyMiddleware(reduxThunk, createLogger({ collapsed: true }))
);
