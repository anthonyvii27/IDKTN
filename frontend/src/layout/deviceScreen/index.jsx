import React from 'react';
import { Screen } from './styles';

const DeviceScreen = props => (
    <Screen bgColor={props.bgColor}>
        {props.children}
    </Screen>
);

export default DeviceScreen;