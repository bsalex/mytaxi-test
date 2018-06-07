import React from 'react';
import AppComponent from './AppComponent';
import * as actions from './AppActions';
import { AppStore } from '../store';
import { connect, Dispatch } from 'react-redux';

interface AppComponentContainerProps {
    fetchVehicles(): void;
}

class AppComponentContainer extends React.PureComponent<AppComponentContainerProps> {
    componentDidMount() {
        this.props.fetchVehicles();
    }

    render() {
        return (
            <AppComponent />
        );
    }
}

export default connect(
    undefined,
    (dispatch: Dispatch<AppStore>): AppComponentContainerProps => {
        return {
            fetchVehicles: () => dispatch(actions.fetchVehicles())
        };
    }
)(AppComponentContainer);
