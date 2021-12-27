import React, { useState } from 'react'
import styled from 'styled-components'
import { Flex, ButtonMenu, ButtonMenuItem, Text } from '@evercreative/onidex-uikit'
import { SwapDetailsContainer } from './SwapComponents'
import OTCPanel from './Components/OTCPanel'

const AdvancedSwapDetailsInfo = () => {
  const [tabIndex, setTabIndex] = useState(2)
  const handleChangeTabIndex = (type) => {
    setTabIndex(type)
  }
  return (
    <SwapDetailsContainer bkColor="#111111">
      <OrderTypesWrapper>
        <ButtonMenu activeIndex={tabIndex} variant="primary" onClick={handleChangeTabIndex}>
          <TradeTypeItem active={tabIndex === 0}>
            Max return
          </TradeTypeItem>
          <TradeTypeItem active={tabIndex === 1}>
            Lowest gas
          </TradeTypeItem>
          <TradeTypeItem active={tabIndex === 2}>
            OTC
          </TradeTypeItem>
        </ButtonMenu>
      </OrderTypesWrapper>
      {
        tabIndex === 2 &&
        <OTCPanel />
      }      
    </SwapDetailsContainer>
  )
}

export const OrderTypesWrapper = styled(Flex)`
  padding: 8px 0px;
  div {
    height: 32px;
    border-radius: 0px;
    background: transparent;
    border: none;
    width: 100%;
  }
`;

export const TradeTypeItem = styled(ButtonMenuItem)<{ active?: boolean }>`
  height: 32px;
  font-size: 14px;
  border-radius: 16px;
  border: none;
  color: ${({ active }) => active ? '#FFF' : '#FFF'};
  /* border-bottom: ${({ active }) => active && '2px solid #90E0EF'}; */
  background: ${({ active }) => active ? 'linear-gradient(220.75deg, #2E0006 -16.91%, #CF203C 126.67%)': 'transparent'};
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
const Label = styled(Text)<{ saved?: boolean }>`
  color: ${({ theme }) => theme.isDark ? '#878787' : 'black'};
  color: ${({ saved }) => saved && '#CF203C'};
  white-space: nowrap;
  font-weight: 300;
  font-size: 12px;
  line-height: 14.06px;
`;
export default AdvancedSwapDetailsInfo
