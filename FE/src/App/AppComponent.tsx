import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import VehiclesList from '../VehiclesList/VehiclesList';
import './App.pcss';

export default function() {
    return (
        <div className="app">
            <div className="app__sidebar">
                <AppHeader className="app__header" />
                <VehiclesList className="app__vehicles-list" />
            </div>
            <div className="app__map">Map</div>
        </div>
    );
}
