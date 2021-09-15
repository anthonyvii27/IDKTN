import styled from 'styled-components';

export const BarSection = styled.section`
    width: 318px;
    height: 30px;
    padding: 0 16px;
    background: rgba(0,0,0,.1);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    font-size: 12px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
`

export const BarDate = styled.div`
    color: #E5E5E5;
    font-weight: 500;
`

export const BarTimeIcons = styled.div`
    width: 90px;
    color: #FFF;    

    display: flex;
    justify-content: space-between;
    align-items: center;
`