import React from 'react';
import MainScreen from './layout/main';
import Device from './layout/device';
import DeviceScreen from './layout/deviceScreen';
import Bar from './layout/bar';

const App = () => (
    <MainScreen>
        <Device>
            <DeviceScreen>
                <Bar />
            </DeviceScreen>
        </Device>
    </MainScreen>
);

export default App;