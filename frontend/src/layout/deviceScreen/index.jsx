import React from 'react';
import { Screen } from './styles';

const DeviceScreen = props => (
    <Screen bgColor="#00A3FF">
        {props.children}
    </Screen>
);

export default DeviceScreen;