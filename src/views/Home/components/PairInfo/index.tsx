/* eslint-disable react/react-in-jsx-scope */
import React, { useState } from 'react';
import styled from 'styled-components'
import { ButtonMenu } from '@evercreative/onidex-uikit'
import { useEthPrices } from 'hooks/useEthPrices'
import { useUniUsdPrice } from 'hooks/useUSDCPrice'
import RedStarIcon from 'assets/images/redStar.svg'
import GreyStarIcon from 'assets/images/greyStar.svg'
import SearchInputSection from './SearchInputSection'
import { OrderTypesWrapper, TradeTypeItem } from './AutoHistoryStyles'

const OrderBookCard = styled.div`
  background: ${({ theme }) => (theme.isDark ? '#070707' : '#fff')};
  color: ${({ theme }) => (theme.isDark ? '#fff' : '#000')};
  padding: 16px;
  min-width: 240px;
  width: 25%;
  margin-left: 5px;
  margin-right: 5px;

  // height: 953px;
  border-radius: 15px;
  // padding: 10px 20px;
  text-align: center;

  table {
    width: 100%;
    margin: 16px 0;
  }

  p {
    font-weight: normal;
    font-size: 14px;
    letter-spacing: 0.1em;
    text-align: center;
  }

  .order_book_table_heading {
    font-size: 14px;
    letter-spacing: 0.1em;
    color: ${({ theme }) => (theme.isDark ? '#d3d3d5' : '#000')};
    opacity: 0.79;
    line-height: 2;
  }

  .order_book_table_body {
    font-family: 'Roboto';
    font-weight: 300;
    font-size: 12px;
    color: ${({ theme }) => (theme.isDark ? '#d3d3d5' : '#000')};
    td {
      padding: 6px 0px;
    }

  }
  @media screen and (max-width: 1144px) {
    width: calc(100% - 16px);
    margin-top: 30px;
  }
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 490px) {
    flex-direction: column;
  }
`

const pairData = [
  {
    id: "pair1",
    fav: true,
    tokenSymbol: "ETH",
    quoteSymbol: "USDT",
    tokenPrice: 4700.56,
    change: 2.36
  },{
    id: "pair2",
    fav: false,
    tokenSymbol: "ETH",
    quoteSymbol: "USDT",
    tokenPrice: 4700.56,
    change: 2.36
  },{
    id: "pair3",
    fav: false,
    tokenSymbol: "ETH",
    quoteSymbol: "USDT",
    tokenPrice: 4700.56,
    change: 2.36
  },{
    id: "pair4",
    fav: false,
    tokenSymbol: "ETH",
    quoteSymbol: "USDT",
    tokenPrice: 4700.56,
    change: 2.36
  },{
    id: "pair5",
    fav: true,
    tokenSymbol: "ETH",
    quoteSymbol: "USDT",
    tokenPrice: 4700.56,
    change: 2.36
  },{
    id: "pair6",
    fav: true,
    tokenSymbol: "ETH",
    quoteSymbol: "USDT",
    tokenPrice: 4700.56,
    change: 2.36
  },{
    id: "pair7",
    fav: true,
    tokenSymbol: "ETH",
    quoteSymbol: "USDT",
    tokenPrice: 4700.56,
    change: 2.36
  },{
    id: "pair8",
    fav: true,
    tokenSymbol: "ETH",
    quoteSymbol: "USDT",
    tokenPrice: 4700.56,
    change: 2.36
  },{
    id: "pair9",
    fav: true,
    tokenSymbol: "ETH",
    quoteSymbol: "USDT",
    tokenPrice: 4700.56,
    change: 2.36
  },{
    id: "pair10",
    fav: true,
    tokenSymbol: "ETH",
    quoteSymbol: "USDT",
    tokenPrice: 4700.56,
    change: 2.36
  },{
    id: "pair11",
    fav: true,
    tokenSymbol: "ETH",
    quoteSymbol: "USDT",
    tokenPrice: 4700.56,
    change: 2.36
  },{
    id: "pair12",
    fav: true,
    tokenSymbol: "ETH",
    quoteSymbol: "USDT",
    tokenPrice: 4700.56,
    change: 2.36
  },
]

const marketTrades = [
  {
    id: 'trade1',
    time: '10:56:36 PM',
    tradeAmt: 0.5614,
  },{
    id: 'trade2',
    time: '10:56:36 PM',
    tradeAmt: 0.5614,
  },{
    id: 'trade3',
    time: '10:56:36 PM',
    tradeAmt: -0.5614,
  },{
    id: 'trade4',
    time: '10:56:36 PM',
    tradeAmt: 0.5614,
  },{
    id: 'trade5',
    time: '10:56:36 PM',
    tradeAmt: 0.5614,
  },{
    id: 'trade6',
    time: '10:56:36 PM',
    tradeAmt: 0.5614,
  },{
    id: 'trade7',
    time: '10:56:36 PM',
    tradeAmt: -0.5614,
  },{
    id: 'trade8',
    time: '10:56:36 PM',
    tradeAmt: 0.5614,
  },{
    id: 'trade9',
    time: '10:56:36 PM',
    tradeAmt: 0.5614,
  },{
    id: 'trade10',
    time: '10:56:36 PM',
    tradeAmt: -0.5614,
  },{
    id: 'trade11',
    time: '10:56:36 PM',
    tradeAmt: 0.5614,
  },{
    id: 'trade12',
    time: '10:56:36 PM',
    tradeAmt: 0.5614,
  },
]

const myTrades = [
  {
    id: 'trade1',
    time: '10:56:36 PM',
    tradeAmt: 0.5614,
  },{
    id: 'trade1',
    time: '10:56:36 PM',
    tradeAmt: 0.5614,
  },
]

const PairInfo = ({ selectedTokenInfo }) => {
  // const uniPriceUsd = useUniUsdPrice();
  const [tradeType, setTradeType] = useState(0)
  const ethPriceUsd = useEthPrices();
  const ethCurrentPriceUsd = ethPriceUsd !== undefined ? ethPriceUsd.current : 0

  const handleChangeTradeType = (type) => {
    setTradeType(type)
  }

  const tradeData = tradeType === 0 ? marketTrades : myTrades

  return (
    <OrderBookCard>
      <SearchInputSection />
      <ContentContainer>
        <table className="table mt-5 table-borderless">
          <thead>
            <tr className="order_book_table_heading">
              <td />
              <td>Pair</td>
              <td>Price</td>
              <td>Change</td>
            </tr>
          </thead>
          <tbody>
            {
              pairData.map((_p) => {
                return (
                  <tr className="order_book_table_body" key={_p.id}>
                    {
                      _p.fav ?
                      <img src={RedStarIcon} alt="icon" />:
                      <img src={GreyStarIcon} alt="icon" />
                    }
                    <td style={{ color: '#F1FFF8' }}>{`${_p.tokenSymbol}/${_p.quoteSymbol}`}</td>
                    <td style={{ color: '#1BC870' }}>{_p.tokenPrice}</td>
                    <td style={{ color: '#1BC870' }}>{_p.change}%</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        <OrderTypesWrapper>
          <ButtonMenu activeIndex={tradeType} variant="primary" onClick={handleChangeTradeType}>
            <TradeTypeItem active={tradeType === 0}>
              Market Trades
            </TradeTypeItem>
            <TradeTypeItem active={tradeType === 1}>
              My Trades
            </TradeTypeItem>
          </ButtonMenu>
        </OrderTypesWrapper>
        <table className="table mt-5 table-borderless">
          <thead>
            <tr className="order_book_table_heading">
              <td>Time</td>
              <td>Traded</td>
              <td>Value</td>
            </tr>
          </thead>
          <tbody>
            {
              tradeData.map((_t) => {
                return (
                  <tr className="order_book_table_body" key={_t.id}>
                    <td style={{ color: _t.tradeAmt > 0 ? '#1BC870' : '#EF5350' }}>{_t.time}</td>
                    <td style={{ color: _t.tradeAmt > 0 ? '#1BC870' : '#EF5350', display: 'flex', justifyContent: 'center' }}>{Math.abs(_t.tradeAmt)}<p style={{color: '#787878'}}>&nbsp;ETH</p></td>
                    <td style={{ color: _t.tradeAmt > 0 ? '#1BC870' : '#EF5350' }}>${(Math.abs(_t.tradeAmt) * ethCurrentPriceUsd).toFixed(2)}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </ContentContainer>
    </OrderBookCard>
  )
}

export default PairInfo
