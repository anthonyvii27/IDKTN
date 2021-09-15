import React from 'react';
import { MdNfc } from 'react-icons/md';

import { 
    RFIDReaderContainer,
    RFIDReaderIcon
} from './styles';

const RFIDReader = props => (
    <RFIDReaderContainer>
        <RFIDReaderIcon>
            <MdNfc size={50} />
        </RFIDReaderIcon>
    </RFIDReaderContainer>
);

export default RFIDReader;