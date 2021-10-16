import React, { useState, useEffect } from 'react';

import MainScreen from './layout/main';
import Device from './layout/device';
import DeviceScreen from './layout/deviceScreen';
import Bar from './layout/bar';
import MessageSection from './layout/message';
import Wave from './layout/wave';
import RFIDReader from './layout/rfidReader';
import { socket } from './services/client';

const App = () => {
    const [event, setEvent] = useState({
        message: "Aproxime o cartão",
        balance: 0
    });

    useEffect(() => {
        socket.on("message", data => {
            console.log(data);
            // setEvent([data]);
        });
    }, [socket]);

    return (
    <MainScreen>
        <Device>
            {/* #0DB628 */}
            <DeviceScreen bgColor="#00A3FF">
                <Bar />
                <MessageSection message={event.message} balance={event.balance} />
                <Wave />
            </DeviceScreen>
            <RFIDReader />
        </Device>
    </MainScreen>
);
    }

export default App;