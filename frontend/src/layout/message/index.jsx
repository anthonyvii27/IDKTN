import React from 'react';
import { 
    MessageContainer, 
    MessageText 
} from './styles';

const MessageSection = props => (
    <MessageContainer>
        <MessageText>
            {props.message}
        </MessageText>
    </MessageContainer>
);

export default MessageSection;