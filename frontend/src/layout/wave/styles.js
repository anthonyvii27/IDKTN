import styled from 'styled-components';

export const WaveContainer = styled.section`
    width: 100%;
    height: 160px;
    display: flex;
    justify-content: center;
    flex-direction: column;
`

export const WaveCreatorsContainer = styled.div`
    width: 100%;
    height: 25px;
    background: rgba(0,0,0,.1);
    display: flex;
    justify-content: flex-end;

    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;

    span {
        color: #E5E5E5;
        font-size: 12px;
        font-weight: 500;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        padding: 0 16px;
    }
        
    
`