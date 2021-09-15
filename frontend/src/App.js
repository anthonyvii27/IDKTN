import React from 'react';
import MainScreen from './layout/main';
import Device from './layout/device';
import DeviceScreen from './layout/deviceScreen';

const App = () => (
    <MainScreen>
        <Device>
            <DeviceScreen>

            </DeviceScreen>
        </Device>
    </MainScreen>
);

export default App;