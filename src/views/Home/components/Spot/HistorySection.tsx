import React, { useState } from 'react';
import styled, {useTheme} from 'styled-components'
import BigNumber from 'bignumber.js'
import { Flex, ArrowDropDownIcon, Text } from '@onidex-libs/uikit';
import { SubMenu, SubMenuItem } from 'components/SubMenu';
import { useUniUsdPrice } from 'hooks/useUSDCPrice'
import { useEthPrices } from 'hooks/useEthPrices'
import { useToken } from 'hooks/useTokens'
import { getBalanceNumber } from 'utils/formatBalance'
import { ReactComponent as ClassicViewIcon } from 'assets/images/classicView.svg';
import { UNITOKEN } from '../../../../constants';

const pairData = {
  token: {
    symbol: 'ONI',
    address: '',
    balance: 108.5,
  },
  quoteToken: {
    symbol: 'USDT',
    address: '',
    balance: 264.0241843,
  }
}

const historyData = [
  {
    id: 'history1',
    price: 5.08,
    amount: '576,213,540.23',
    percent: 60,
  },
  {
    id: 'history2',
    price: 5.07,
    amount: '576,213,540.23',
    percent: 100,
  },
  {
    id: 'history3',
    price: 5.06,
    amount: '576,213,540.23',
    percent: 50,
  },
  {
    id: 'history4',
    price: 5.05,
    amount: '576,213,540.23',
    percent: 80,
  },
  {
    id: 'history5',
    price: 5.04,
    amount: '576,213,540.23',
    percent: 100,
  },
  {
    id: 'history6',
    price: 5.03,
    amount: '576,213,540.23',
    percent: 55,
  },
]

const selectValues = [1, 0.01, 0.001, 0.0001]

const HistorySection = ({ selectedTokenInfo, orderLimitData, selectedCurrency }) => {
  const [tabIndex, setTabIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  const uniPriceUsd = useUniUsdPrice();
  const ethPriceUsd = useEthPrices();
  const theme = useTheme()

  const toggling = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsOpen(!isOpen);
    event.stopPropagation();
  };

  const handleItemClick = (index) => {
    setTabIndex(index)
    setIsOpen(false)
  }

  const selectedToken = useToken(selectedCurrency ? selectedCurrency.address.toLowerCase() : UNITOKEN.toLowerCase());

  const quoteTokenPrice = selectedTokenInfo ? selectedTokenInfo.quotePrice * ethPriceUsd?.current : selectedCurrency.symbol === 'WETH' ? ethPriceUsd?.current : uniPriceUsd;

  const makerData = orderLimitData?
    orderLimitData.filter((_, index) => _.type === 'maker' )
    :
    []
  const takerData = orderLimitData?
    orderLimitData.filter((_, index) => _.type === 'taker')
    :
    []

  const maxSellAmount = Math.max(...makerData.map(function (o) { return parseInt(o.data.makingAmount) }));
  const maxBuyAmount = Math.max(...takerData.map(function (o) { return parseInt(o.data.takingAmount) }));
  
  return (
    <Container>
      <HeaderContainer>
        <div>
          <p>Price</p>
          <p>(USD)</p>
        </div>
        <div>
          <p>Amount</p>
          <p className = "align_right">{`(${selectedToken?.symbol})`}</p>
        </div>
      </HeaderContainer>
      {
        makerData.map((history, index) => {
          if (index >= 7) {
            return null;
          }
          const amount = getBalanceNumber(new BigNumber(history.data.makingAmount), selectedToken?.decimals)
          return (
            <ItemContainer key={index.toString()}>
              <PercentDiv percent={parseInt(history.data.makingAmount) / maxSellAmount * 100} color='rgba(24, 40,37, .5)'/>
              <p className = "price_text-top">{quoteTokenPrice.toFixed(2)}</p>
              <p className = "amount_text-top">{amount.toFixed(2)}</p>
            </ItemContainer>
          )
        })
      }
      <MidHeader>
        <p className = "price-top">${quoteTokenPrice.toFixed(3)}</p>
        {/* <p className = "price-bottom">= 5.306$</p> */}
      </MidHeader>
      {
        takerData.map((history, index) => {
          if (index >= 6) {
            return null;
          }
          const amount = getBalanceNumber(new BigNumber(history.data.takingAmount), selectedToken?.decimals)
          return (
            <ItemContainer key={index.toString()}>
              <PercentDiv percent={parseInt(history.data.takingAmount) / maxBuyAmount * 100} color='rgba(30, 11, 14, 1)'/>
              <p className = "price_text-top">{quoteTokenPrice.toFixed(2)}</p>
              <p className = "amount_text-top">{amount.toFixed(2)}</p>
            </ItemContainer>
          )
        })
      }
      <HistoryFooter>
        <SelectorWrapper>
          <Selector
            component={
              <SelectorHeader>
                <div />
                <Text>{selectValues[tabIndex]}</Text>
                <ArrowDropDownIcon />
              </SelectorHeader>
            }
            options={{placement: "left"}}
            isOpen={isOpen}
            toggling={toggling}
            setIsOpen={setIsOpen}
          >
            <CustomSubItem onClick={() => handleItemClick(0)} >1</CustomSubItem>
            <CustomSubItem onClick={() => handleItemClick(1)}>0.01</CustomSubItem>
            <CustomSubItem onClick={() => handleItemClick(2)}>0.001</CustomSubItem>
            <CustomSubItem onClick={() => handleItemClick(3)}>0.0001</CustomSubItem>
          </Selector>
        </SelectorWrapper>
        <ClassicView>
          <ClassicViewIcon />
          <p className="classic-view-text">Classic View</p>
        </ClassicView>
      </HistoryFooter>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 10px;
`
const HeaderContainer = styled(Flex)`
  color: #909090;
  margin-top: 10px;
  height: 40px;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  .align_right {
    text-align: right;
  }
`
const ItemContainer = styled(Flex)`
  width: 100%;
  height: 20px;
  position: relative;
  justify-content: space-between;
  align-items: center;
  padding-left: 15px;

  .price_text-top {
    color: #16AB5F;
    font-size: 12px;
    z-index: 1;
  }
  .amount_text-top {
    color: #FFFFFF;
    font-size: 12px;
    z-index: 1;
  }
`
const PercentDiv = styled.div<{percent?: number; color?: string;}>`
  position: absolute;
  right: -15px;
  height: 20px;
  width: ${({percent}) => `calc(${percent}% + 15px)` };
  background-color: ${({color}) => color};
`
const MidHeader = styled(Flex)`
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 10px;
  .price-top {
    color: #16AB5F;
    font-size: 18px;
  }
  .price-bottom {
    color: #909090;
    font-size: 18px;
  }
`
const HistoryFooter = styled(Flex)`
  height: 32px;
  margin-top: 24px;
  width: 100%;
`
const SelectorHeader = styled(Flex)`
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding-top: 4px;
`
const SelectorWrapper = styled.div`
  width: 60%;
  background: linear-gradient(91.04deg, #222929 -17.29%, rgba(34, 41, 41, 0) 93.97%);
  border-radius: 0px 15px;
  border: none;
  margin-right: 10px;
  text-align: center;
`
const Selector = styled(SubMenu)`
  color: #FFFFFF;
  width: 100%;
`
const CustomSubItem = styled(SubMenuItem)`
  width: 100%;
  padding: 5px;
`
const ClassicView = styled(Flex)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #FFFFFF;
  font-size: 10px;
  background-color: #181B1B;
  border-radius: 5px;
  height: 32px;
  width: 40%;
  .classic-view-text {
    margin-top: 4px;
    text-align: center;
  }
`
export default HistorySection;
