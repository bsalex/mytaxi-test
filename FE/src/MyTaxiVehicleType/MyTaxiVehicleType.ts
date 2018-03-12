import VehicleType from '../VehicleType/VehicleType';
import MyTaxiVehicleTypeComponent from './MyTaxiVehicleTypeComponent';

interface MyTaxiResult {
    poiList: {
        id: number,
        coordinate: {
            latitude: number,
            longitude: number
        },
        state: 'ACTIVE' | 'INACTIVE',
        type: 'TAXI'
    }[];
}

export default {
    name: 'mytaxi',
    listView: MyTaxiVehicleTypeComponent,
    loader: async () => {
        const result: MyTaxiResult = await (await fetch('/mytaxi/vehicles')).json();

        return result.poiList.map((myTaxiVehicle) => ({
            id: 'mytaxi-' + myTaxiVehicle.id,
            type: 'mytaxi',
            coordinates: {
                ...myTaxiVehicle.coordinate
            },
            data: myTaxiVehicle
        }));
    }
} as VehicleType;
