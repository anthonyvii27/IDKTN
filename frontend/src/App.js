import React from 'react';
import MainScreen from './layout/main';
import Device from './layout/device';
import DeviceScreen from './layout/deviceScreen';
import Bar from './layout/bar';
import MessageSection from './layout/message';
import Wave from './layout/wave';

const App = () => (
    <MainScreen>
        <Device>
            <DeviceScreen>
                <Bar />

                <MessageSection message="Aproxime o cartão" />

                <Wave />
            </DeviceScreen>
        </Device>
    </MainScreen>
);

export default App;