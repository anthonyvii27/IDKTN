import React from 'react';
import { 
    MessageContainer, 
    MessageText,
    Balance
} from './styles';

const MessageSection = props => (
    <MessageContainer>
        <MessageText>
            {props.message}
        </MessageText>
        
        {props.balance ? 
            <Balance>
                <h1>R$ {props.balance}</h1>
                <h2>Seu saldo</h2>
            </Balance>
        : undefined }
       
    </MessageContainer>
);

export default MessageSection;