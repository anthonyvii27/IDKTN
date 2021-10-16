import React, { useState, useEffect } from 'react';

import MainScreen from './layout/main';
import Device from './layout/device';
import DeviceScreen from './layout/deviceScreen';
import Bar from './layout/bar';
import MessageSection from './layout/message';
import Wave from './layout/wave';
import RFIDReader from './layout/rfidReader';
import { socket } from './services/client';

const initialState = {
    type: "wait",
    message: "Aproxime o cartão",
    balance: null
};

const App = () => {
    const [event, setEvent] = useState({ ...initialState });

    useEffect(() => {
        socket.on("success", data => {
            setEvent({ 
                type: "pass",
                message: "Passe", 
                balance: data 
            });

            setTimeout(() => {
                setEvent({ ...initialState })
            }, 3000)
        });

        
    }, [socket]);

    return (
        <MainScreen>
            <Device>
                <DeviceScreen bgColor={event?.type === "wait" ? "#00A3FF" : "#0DB628"}>
                    <Bar />
                    <MessageSection message={event.message} balance={event.balance?.toFixed(2)} />
                    <Wave />
                </DeviceScreen>
                <RFIDReader />
            </Device>
        </MainScreen>
    );
}

export default App;