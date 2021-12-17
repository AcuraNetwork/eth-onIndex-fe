import React from 'react';
import styled from 'styled-components';
import { BASE_URL } from 'config';

const MobileFooter = () => {
    const currentURL = window.location.href;
    return (
        <Containter>
            <StyledLink href="/swap" color={currentURL === `${BASE_URL}swap` ? "#FFA50A" : "#FFFFFF"}>Home</StyledLink>
            <StyledLink href="/" color={currentURL === BASE_URL ? "#FFA50A" : "#FFFFFF"}>Charts</StyledLink>
            <StyledLink href="/pools" color={currentURL === `${BASE_URL}pools` ? "#FFA50A" : "#FFFFFF"}>Dex Explorer</StyledLink>
            <StyledLink href="/farms" color={currentURL === `${BASE_URL}farms` ? "#FFA50A" : "#FFFFFF"}>Farms</StyledLink>
        </Containter>
    )
}

const Containter = styled.div`
    width: calc(100% + 16px);
    height: 50px;
    position: -webkit-sticky;
    position: sticky;
    bottom: 0;
    margin-left: -8px;
    background-color: #111;
    box-shadow: 0px 0px 8px 1px rgba(40, 189, 235, 0.5);
    display: none;
    @media screen and (max-width: 768px) {
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
`;
const StyledLink = styled.a<{color?: string}>`
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    text-align: center;

    color: ${({color}) => color};
`
export default MobileFooter;
