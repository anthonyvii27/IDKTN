import styled from 'styled-components';

export const MessageContainer = styled.section`
    width: 100%;
    height: 180px;

    display: flex;
    flex-direction: column;
    justify-content: center;
`

export const MessageText = styled.h1`
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 40px;
    font-weight: 700;
    color: #FFF;
    line-height: 1.2;
    padding: 0 80px 0 30px;
`

export const Balance = styled.div`
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    padding: 0 30px;
    margin-top: 20px;
    width: 100%;
    height: 50px;

    h1 {        
        font-size: 27px;
        font-weight: 700;
        color: #FFF;
    }

    h2 {
        margin-top: 5px;
        font-size: 20px;
        font-weight: 700;
        color: #E5E5E5;
    }
`