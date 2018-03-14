import React from 'react';
import VehicleService from '../VehicleService';

describe('VehiclesListComponent', () => {
    const stubVehicles1 = [{
        id: '1',
        type: 'test-1',
        coordinates: {
            latitude: 50,
            longitude: 50
        },
        data: {}
    }, {
        id: '2',
        type: 'test-1',
        coordinates: {
            latitude: 50,
            longitude: 50
        },
        data: {}
    }];

    const stubVehicles2 = [{
        id: '1',
        type: 'test-2',
        coordinates: {
            latitude: 50,
            longitude: 50
        },
        data: {}
    }, {
        id: '2',
        type: 'test-2',
        coordinates: {
            latitude: 50,
            longitude: 50
        },
        data: {}
    }];

    const stubVehicleTypes = [{
        name: 'type-1',
        listView: () => (<div>1</div>),
        async loader() {
            return await stubVehicles1;
        }
    }, {
        name: 'type-2',
        listView: () => (<div>2</div>),
        async loader() {
            return await stubVehicles2;
        }
    }];

    beforeEach(() => {
        VehicleService.registerVehicleType(stubVehicleTypes[0]);
        VehicleService.registerVehicleType(stubVehicleTypes[1]);
    });

    afterEach(() => {
        VehicleService.unregisterVehicleType(stubVehicleTypes[0]);
        VehicleService.unregisterVehicleType(stubVehicleTypes[1]);
    });

    it('should load vehicles from all registered vehicle types', async () => {
        const vehicles = await VehicleService.fetchVehicles();

        expect(vehicles).toEqual([...stubVehicles1, ...stubVehicles2]);
    });

    it('should not load vehicles from unregistered vehicle type', async () => {
        VehicleService.unregisterVehicleType(stubVehicleTypes[0]);
        const vehicles = await VehicleService.fetchVehicles();

        expect(vehicles).toEqual([...stubVehicles2]);
    });

    it('should return empty array if no vehicle types are registered', async () => {
        VehicleService.unregisterVehicleType(stubVehicleTypes[0]);
        VehicleService.unregisterVehicleType(stubVehicleTypes[1]);

        const vehicles = await VehicleService.fetchVehicles();
        expect(vehicles).toEqual([]);
    });

    it('should return empty array if no vehicle types are registered', async () => {
        VehicleService.unregisterVehicleType(stubVehicleTypes[0]);
        VehicleService.unregisterVehicleType(stubVehicleTypes[1]);

        const vehicles = await VehicleService.fetchVehicles();
        expect(vehicles).toEqual([]);
    });
});
