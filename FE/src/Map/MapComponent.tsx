import React from 'react';
import classnames from 'classnames';
import { Vehicle } from '../VehicleType/VehicleType';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, TrafficLayer } from 'react-google-maps';
import './Map.pcss';
import vehiclePath from './vehiclePath.txt';

interface Props {
    className?: string;
    vehicles: Vehicle[];
    isLoading: boolean;
    selectedVehicleId?: string;
    selectVehicle(vehicle: Vehicle): void;
}

interface State {
    defaultCenter?: google.maps.LatLngLiteral;
}

function getAvgByAccessor<T>(array: T[], accessor: (value: T) => number) {
    return array.reduce((a, b) => a + accessor(b), 0) / array.length;
}

const Map = withScriptjs(withGoogleMap(
    class extends React.PureComponent<Props, State> {
        constructor(props: Props) {
            super(props);

            this.state = {
                defaultCenter: undefined
            };
        }

        calculateDefaultCenter(props: Props) {
            const avgLatitude = getAvgByAccessor(props.vehicles, (vehicle) => vehicle.coordinates.latitude);
            const avgLongitude = getAvgByAccessor(props.vehicles, (vehicle) => vehicle.coordinates.longitude);

            this.setState({
                defaultCenter: {
                    lat: avgLatitude,
                    lng: avgLongitude
                }
            });
        }

        componentWillMount() {
            this.calculateDefaultCenter(this.props);
        }

        componentWillReceiveProps(nextProps: Props) {
            if ((nextProps.vehicles.length !== this.props.vehicles.length) || !this.state.defaultCenter) {
                this.calculateDefaultCenter(nextProps);
            }
        }

        render() {
            if (!this.props.vehicles.length) {
                return (<div className={classnames(this.props.className, 'map')}/>);
            }

            let newCenter;
            const selectedVehicle = this.props.vehicles.find((vehicle) => vehicle.id === this.props.selectedVehicleId);

            if (selectedVehicle) {
                newCenter = { lat: selectedVehicle.coordinates.latitude, lng: selectedVehicle.coordinates.longitude };
            }

            return (
                <div className={classnames(this.props.className, 'map')}>
                    <GoogleMap
                        defaultZoom={12}
                        defaultCenter={this.state.defaultCenter}
                        {...(newCenter ? { center: newCenter } : {})}
                    >
                        {this.props.vehicles.map((vehicle, index) => {
                            const isSelectedVehicle = this.props.selectedVehicleId === vehicle.id;

                            return (
                                <Marker
                                    cursor="pointer"
                                    icon={{
                                        path: vehiclePath,
                                        fillOpacity: 1,
                                        fillColor: isSelectedVehicle ? '#d1352b' : '#fdc300',
                                        strokeColor: '#4a4a4a',
                                        scale: isSelectedVehicle ? 1 : 0.6
                                    }}
                                    key={vehicle.id}
                                    zIndex={isSelectedVehicle ? this.props.vehicles.length + 1 : index}
                                    position={{ lat: vehicle.coordinates.latitude, lng: vehicle.coordinates.longitude }}
                                    onClick={() => this.props.selectVehicle(vehicle)}
                                />
                            );
                        })}
                        <TrafficLayer />
                    </GoogleMap>
                </div>
            );
        }
    }
));

export default function(props: Props) {
    const key = 'AIzaSyAxEriE4ou-n1rpgBV7qniQ1u2cvkTCJfg';
    const mapUrl = `https://maps.googleapis.com/maps/api/js?key=${key}&v=3.exp&libraries=geometry,drawing,places`;

    return (
        <Map
            googleMapURL={mapUrl}
            loadingElement={
                <div className={classnames(props.className, 'map')}>
                    <div className="app__loader" />
                </div>}
            containerElement={<div className={classnames(props.className, 'map')} />}
            mapElement={<div style={{ height: `100%` }} />}
            {...props}
        />
    );
}
