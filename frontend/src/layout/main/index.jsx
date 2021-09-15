import React from 'react';
import { Main } from './styles';

const MainScreen = props => (
    <Main>
        {props.children}
    </Main>
);

export default MainScreen;