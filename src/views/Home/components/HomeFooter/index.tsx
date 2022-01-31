import React, { useState } from 'react'
import styled from 'styled-components'
import { ButtonMenu, Flex } from '@evercreative/onidex-uikit'
import { OrderTypesWrapper, TradeTypeItem } from './AutoHistoryStyles';

const HomeFooter = () => {
  const [tabIndex, setTabIndex] = useState(0)
  const handleChangeTabIndex = (type) => {
    setTabIndex(type)
  }
  return (
    <Container>
      <OrderTypesWrapper>
        <ButtonMenu activeIndex={tabIndex} variant="primary" onClick={handleChangeTabIndex}>
          <TradeTypeItem active={tabIndex === 0}>
            ORDERS
          </TradeTypeItem>
          <TradeTypeItem active={tabIndex === 1}>
            FILES
          </TradeTypeItem>
          <TradeTypeItem active={tabIndex === 2}>
            FAVORITES
          </TradeTypeItem>
        </ButtonMenu>
      </OrderTypesWrapper>
      <Content>
        {
          tabIndex === 0 &&
          <Orders>
            There are no orders yet.
          </Orders>
        }
        {
          tabIndex === 1 &&
          <Orders>
            There are no files yet.
          </Orders>
        }
        {
          tabIndex === 2 &&
          <Orders>
            There are no favorites yet.
          </Orders>
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
  margin-top: 20px;
  
  @media screen and (max-width: 1144px) {
    width: calc(100% - 16px);
    margin-top: 30px;
  }
  @media screen and (max-width: 990px) {
    width: 100%;
  }
`
const Content = styled(Flex)`
  width: 100%;
  padding: 20px;

`
const Orders = styled.div`
  min-height: 100px;
  color: white;
`
export default HomeFooter
