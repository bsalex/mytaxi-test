import React from 'react';
import classnames from 'classnames';
import { Vehicle } from '../VehicleType/VehicleType';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, TrafficLayer } from 'react-google-maps';

interface Props {
    className: string;
    vehicles: Vehicle[];
    isLoading: boolean;
    selectedVehicleId?: string;
    selectVehicle(vehicle: Vehicle): void;
}

const VehiclesMap = withScriptjs(withGoogleMap(function (
    {className, vehicles, isLoading, selectedVehicleId, selectVehicle}: Props
) {
    if (!vehicles.length) {
        return (<div className={classnames(className, 'map')}/>);
    }

    let newCenter;
    const selectedVehicle = vehicles.find((vehicle) => vehicle.id === selectedVehicleId);

    if (selectedVehicle) {
        newCenter = { lat: selectedVehicle.coordinates.latitude, lng: selectedVehicle.coordinates.longitude };
    }

    return (
        <div className={classnames(className, 'map')}>
            <GoogleMap
                defaultZoom={12}
                defaultCenter={{ lat: vehicles[0].coordinates.latitude, lng: vehicles[0].coordinates.longitude }}
                {...(newCenter ? { center: newCenter } : {})}
            >
                {vehicles.map((vehicle, index) => {
                    const isSelectedVehicle = selectedVehicleId === vehicle.id;

                    return (
                        <Marker
                            cursor="pointer"
                            icon={{
                                path: `M44.283,14.677h-2.695
                                    c-0.89,0-1.648,0.75-1.648,1.639c0,0,0.022,0.803,0.024,0.842
                                    l-0.897,0.966l-1.078-4.171
                                    c-0.684-2.631-3.057-4.482-5.774-4.482
                                    h-2.258V6.12c0-1.152-0.769-2.195-1.92-2.195
                                    h-10.2c-1.152,0-1.875,1.043-1.875,2.195v3.352
                                    h-2.295c-2.717,0-5.091,1.852-5.774,4.482L6.82,18.093
                                    l-0.868-0.934c0.002-0.04,0.025-0.842,0.025-0.842
                                    c0-0.889-0.759-1.639-1.649-1.639
                                    H1.63c-0.89,0-1.63,0.75-1.63,1.639v0.724c0,0.889,0.74,1.648,1.63,1.648h2.695
                                    c0.085,0,0.168-0.027,0.25-0.04l0.967,1.03
                                    c-1.912,0.497-3.324,2.238-3.324,4.305v7.248c0,2.205,1.622,4.035,3.755,4.381v4.605
                                    c0,0.975,0.752,1.77,1.727,1.77h4.674
                                    c0.975,0,1.791-0.793,1.791-1.77v-4.546
                                    h17.581v4.546c0,0.975,0.758,1.77,1.732,1.77h4.674
                                    c0.975,0,1.787-0.793,1.787-1.77v-4.596
                                    c2.133-0.321,3.754-2.165,3.754-4.391
                                    v-7.248c0-2.068-1.416-3.806-3.33-4.299l0.975-1.036
                                    c0.082,0.013,0.165,0.04,0.25,0.04
                                    h2.695c0.89,0,1.63-0.759,1.63-1.648
                                    v-0.724C45.913,15.427,45.172,14.677,44.283,14.677z
                                    M8.583,30.216c-1.461,0-2.646-1.186-2.646-2.646
                                    c0-1.463,1.185-2.647,2.646-2.647c1.463,0,2.647,1.185,2.647,2.647
                                    C11.23,29.031,10.046,30.216,8.583,30.216z M31.747,28.658
                                    c0,0.903-0.733,1.637-1.638,1.637H15.803
                                    c-0.904,0-1.637-0.733-1.637-1.637v-2.104c0-0.904,0.733-1.637,1.637-1.637
                                    h14.306c0.904,0,1.637,0.732,1.637,1.637L31.747,28.658
                                    L31.747,28.658z M9.534,19.542l1.251-4.84
                                    c0.34-1.312,1.523-2.244,2.878-2.244
                                    h18.549c1.354,0,2.539,0.932,2.878,2.244l1.251,4.84
                                    H9.534z M37.602,30.216c-1.461,0-2.647-1.186-2.647-2.646
                                    c0-1.463,1.187-2.647,2.647-2.647s2.646,1.185,2.646,2.647
                                    C40.247,29.031,39.062,30.216,37.602,30.216z`,
                                fillOpacity: 1,
                                fillColor: isSelectedVehicle ? '#d1352b' : '#fdc300',
                                strokeColor: '#4a4a4a',
                                scale: isSelectedVehicle ? 1 : 0.6
                            }}
                            key={vehicle.id}
                            zIndex={isSelectedVehicle ? vehicles.length + 1 : index}
                            position={{ lat: vehicle.coordinates.latitude, lng: vehicle.coordinates.longitude }}
                            onClick={() => selectVehicle(vehicle)}
                        />
                    );
                })}
                <TrafficLayer />
            </GoogleMap>
        </div>
    );
}));

export default function(props: Props) {
    const key = 'AIzaSyAxEriE4ou-n1rpgBV7qniQ1u2cvkTCJfg';
    const mapUrl = `https://maps.googleapis.com/maps/api/js?key=${key}&v=3.exp&libraries=geometry,drawing,places`;

    return (
        <VehiclesMap
            googleMapURL={mapUrl}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            {...props}
        />
    );
}
