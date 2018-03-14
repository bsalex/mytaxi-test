import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import VehiclesListComponentContainer from '../VehiclesList/VehiclesListComponentContainer';
import MapComponentContainer from '../Map/MapComponentContainer';
import './App.pcss';

export default function() {
    return (
        <div className="app">
            <div className="app__sidebar">
                <AppHeader className="app__header" />
                <VehiclesListComponentContainer className="app__vehicles-list" />
            </div>
            <MapComponentContainer className="app__map" />
        </div>
    );
}
