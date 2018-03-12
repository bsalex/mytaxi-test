import VehicleType from '../VehicleType/VehicleType';
import Car2GoVehicleTypeComponent from './Car2GoVehicleTypeComponent';

enum Car2GoQuality {
    UNACCEPTABLE = 'UNACCEPTABLE',
    GOOD = 'GOOD'
}

export interface Car2GoVehicleData {
    address: string;
    coordinates: number[];
    engineType: 'CE';
    exterior: Car2GoQuality;
    fuel: number;
    interior: Car2GoQuality;
    name: string;
    vin: string;
    id: number;
}

interface MyTaxiResult {
    placemarks: Car2GoVehicleData[];
}

export default {
    name: 'car2go',
    listView: Car2GoVehicleTypeComponent,
    loader: async () => {
        const result: MyTaxiResult = await (await fetch('/car2go/vehicles')).json();

        return result.placemarks.map((car2GoVehicle) => ({
            id: 'car2go-' + car2GoVehicle.id,
            type: 'car2go',
            coordinates: {
                longitude: car2GoVehicle.coordinates[0],
                latitude: car2GoVehicle.coordinates[0]
            },
            data: car2GoVehicle
        }));
    }
} as VehicleType;
