import React, { useState } from 'react';
import styled from 'styled-components';
import { Flex, ButtonMenu, ButtonMenuItem } from '@evercreative/onidex-uikit';
import backImage from 'assets/images/swapback.png';
import SwapPanel from './SwapPanel';
import AdvancedSwapDetailsInfo from './AdvancedSwapDetailsInfo';

const Swap = () => {
  const [tabIndex, setTabIndex] = useState(0)
  const handleChangeTabType = (_i) => {
    setTabIndex(_i)
  }

  return (
    <Wrapper>
      <Mask src={backImage} alt="back"/>
      <Container>
        <TabTypesWrapper>
          <ButtonMenu activeIndex={tabIndex} variant="primary" onClick={handleChangeTabType}>
            <TabTypeItem active={tabIndex === 0}>
              Swap
            </TabTypeItem>
            <TabTypeItem active={tabIndex === 1}>
              Limit
            </TabTypeItem>
            <TabTypeItem active={tabIndex === 2}>
              Liquidity
            </TabTypeItem>
          </ButtonMenu>
        </TabTypesWrapper>
        <Content>
          {
            tabIndex === 0 &&
            <CardsFlex>
              <SwapPanel bigPanel/>
              <AdvancedSwapDetailsInfo bigPanel/>
            </CardsFlex>
          }
        </Content>
      </Container>  
    </Wrapper>
  )
}

const Wrapper = styled(Flex)`
  background-color: #FFF;
  width: 100%;
  height: 100vh;
  justify-content: center;
`
const Container = styled.div`
  background: ${({ theme }) => (theme.isDark ? '#070707' : '#fff')};
  color: ${({ theme }) => (theme.isDark ? '#fff' : '#000')};
  width: 50%;
  height: max-content;
  border-radius: 15px;
  margin-top: 5%;
  z-index:1;
  p {
    font-weight: normal;
    font-size: 14px;
    letter-spacing: 0.1em;
    text-align: center;
  }

  @media screen and (max-width: 1144px) {
    width: calc(100% - 16px);
    margin-top: 30px;
  }
`
const Mask = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100% - 60px);
  /* background-color: rgb(61,61,61,.5); */
`
const Content = styled(Flex)`
  width: 100%;
  height: 100%;
  min-height: 405px;
  padding: 20px;
`
const TabTypesWrapper = styled(Flex)`
  background-color: ${({theme}) => theme.isDark ? '#171717' : 'fff'};
  padding: 8px 16px;
  border-radius: 15px 15px 0 0;
  div {
    height: 32px;
    border-radius: 0px;
    background: transparent;
    border: none;
    width: 100%;
  }
`;
const TabTypeItem = styled(ButtonMenuItem)<{ active?: boolean }>`
  height: 32px;
  font-size: 14px;
  border-radius: 0px;
  color: ${({ active }) => active ? '#CF203C' : '#8F8F8F'};
  /* border-bottom: ${({ active }) => active && '2px solid #90E0EF'}; */
  /* background: transparent; */
  background-color: transparent;
  padding: 0 10px;  
  font-weight: 300;
  /* width: 50%; */

  :hover:not(:disabled):not(.button--disabled):not(:active) {
    color: ${({ active }) => active && '#CF203C'};
    /* border-bottom: ${({ active }) => active && '2px solid #90E0EF'}; */
    background: transparent;
  }
`;
const CardsFlex = styled.div`
  display: flex;
  width: 100%;
`
export default Swap