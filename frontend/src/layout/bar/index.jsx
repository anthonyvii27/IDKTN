import React, { useState } from 'react';
import { BsBatteryHalf } from 'react-icons/bs';
import { FaWifi } from 'react-icons/fa';

import { 
    BarSection,
    BarDate,
    BarTimeIcons
} from './styles';

import getFormattedDate from './scripts/getFormattedDate';
import getFormattedTime from './scripts/getFormattedTime';

const Bar = () => {
    const [time, setTime] = useState(new Date());

    setInterval(() => {
        setTime(new Date());
    }, 1000);

    return (
        <BarSection>
            <BarDate>
                <span>
                    {getFormattedDate(new Date())}
                </span>
            </BarDate>

            <BarTimeIcons>
                <span>
                    {getFormattedTime(time)}
                </span>
                <BsBatteryHalf size={20} />
                <FaWifi size={15} />
            </BarTimeIcons>
        </BarSection>
    )
};

export default Bar;