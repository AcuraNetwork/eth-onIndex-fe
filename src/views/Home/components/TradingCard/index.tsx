import React, { useState } from 'react'
import styled from 'styled-components'
import { ButtonMenu, Flex } from '@evercreative/onidex-uikit'
import SwapPanel from 'views/Swap/SwapPanel';
import AdvancedSwapDetailsInfo from 'views/Swap/AdvancedSwapDetailsInfo';
import TransactionCard from 'views/Swap/TransactionCard';
import { OrderTypesWrapper, TradeTypeItem } from './AutoHistoryStyles';

const TradingCard = () => {
  const [tradeType, setTradeType] = useState(0)
  const handleChangeTradeType = (type) => {
    setTradeType(type)
  }

  return (
    <Container>
      <OrderTypesWrapper>
        <ButtonMenu activeIndex={tradeType} variant="primary" onClick={handleChangeTradeType}>
          <TradeTypeItem active={tradeType === 0}>
            Swap
          </TradeTypeItem>
          <TradeTypeItem active={tradeType === 1}>
            Limit
          </TradeTypeItem>
          <TradeTypeItem active={tradeType === 2}>
            Market
          </TradeTypeItem>
          <TradeTypeItem active={tradeType === 3}>
            Stop
          </TradeTypeItem>
        </ButtonMenu>
      </OrderTypesWrapper>
      <Content>
        {
          tradeType === 0 &&
          <CardsFlex>
            <SwapPanel />
            <AdvancedSwapDetailsInfo />
            <TransactionCard />
          </CardsFlex>
        }
      </Content>
    </Container>
  )
}

const Container = styled.div`
  background: ${({ theme }) => (theme.isDark ? '#070707' : '#fff')};
  color: ${({ theme }) => (theme.isDark ? '#fff' : '#000')};
  width: 100%;
  border-radius: 15px;

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
;
const Content = styled(Flex)`
  width: 100%;
  padding: 20px 20px 5px 20px;
`
const CardsFlex = styled.div`
  display: flex;
  width: 100%;
`

export default TradingCard;
