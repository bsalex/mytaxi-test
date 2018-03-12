import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppComponentContainer from './App/AppComponentContainer';
import store from './store';
import VehicleService from './VehiclesService/VehicleService';
import MyTaxiVehicleType from './MyTaxiVehicleType/MyTaxiVehicleType';
import Car2GoVehicleType from './Car2GoVehicleType/Car2GoVehicleType';
import 'normalize.css';
import './index.css';

VehicleService.registerVehicleType(MyTaxiVehicleType);
VehicleService.registerVehicleType(Car2GoVehicleType);

ReactDOM.render(
  <Provider store={store}>
    <AppComponentContainer />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
