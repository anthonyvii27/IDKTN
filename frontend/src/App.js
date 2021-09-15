import React from 'react';

import MainScreen from './layout/main';
import Device from './layout/device';
import DeviceScreen from './layout/deviceScreen';
import Bar from './layout/bar';
import MessageSection from './layout/message';
import Wave from './layout/wave';
import RFIDReader from './layout/rfidReader';

const App = () => (
    <MainScreen>
        <Device>
            {/* #0DB628 */}
            <DeviceScreen bgColor="#00A3FF">
                <Bar />
                <MessageSection message="Aproxime o cartão" balance="" />
                <Wave />
            </DeviceScreen>
            <RFIDReader />
        </Device>
    </MainScreen>
);

export default App;