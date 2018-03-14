import React from 'react';
import VehiclesListComponent from '../VehiclesListComponent';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('VehiclesListComponent', () => {
    let baseProps = {
        isLoading: false,
        vehicles: [],
        selectVehicle: sinon.spy()
    };

    it('should show loader if vehicles are loading', () => {
        const props = {
            ...baseProps,
            isLoading: true,
        };

        const wrapper = shallow(<VehiclesListComponent {...props} />);
        expect(wrapper.find('.app__loader')).toHaveLength(1);
    });

    it('should not show loader if vehicles loaded', () => {
        const props = {
            ...baseProps,
            isLoading: false
        };

        const wrapper = shallow(<VehiclesListComponent {...props} />);
        expect(wrapper.find('.app__loader')).toHaveLength(0);
    });

    describe('vehicles selection', () => {
        const stubVehicles = [{
            id: '1',
            type: 'testtype',
            coordinates: {
                latitude: 50,
                longitude: 50
            },
            data: {}
        }, {
            id: '2',
            type: 'testtype',
            coordinates: {
                latitude: 50,
                longitude: 50
            },
            data: {}
        }, {
            id: '3',
            type: 'testtype',
            coordinates: {
                latitude: 50,
                longitude: 50
            },
            data: {}
        }];

        it('should call selectVehicle with corresponding vehicle on item clicked', () => {
            const selectVehicleSpy = sinon.spy();

            const props = {
                ...baseProps,
                selectVehicle: selectVehicleSpy,
                vehicles: stubVehicles
            };

            const wrapper = shallow(<VehiclesListComponent {...props} />);
            wrapper.find('.vehicles-list__vehicle').at(1).simulate('click');

            expect(selectVehicleSpy.calledOnce).toBeTruthy();
            expect(selectVehicleSpy.calledWith(stubVehicles[1])).toBeTruthy();
        });

        it(`should mark item as selected if it's id matches selectedVehicleId prop`, () => {
            const selectVehicleSpy = sinon.spy();

            const props = {
                ...baseProps,
                selectVehicle: selectVehicleSpy,
                selectedVehicleId: '3',
                vehicles: stubVehicles
            };

            const wrapper = shallow(<VehiclesListComponent {...props} />);

            expect(
                wrapper.find('.vehicles-list__vehicle').at(2).hasClass('vehicles-list__vehicle--selected')
            ).toBeTruthy();
        });
    });
});
