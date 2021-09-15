import React from 'react';
import { DeviceBody } from './styles';

const Device = props => (
    <DeviceBody>
        {props.children}
    </DeviceBody>
);

export default Device;