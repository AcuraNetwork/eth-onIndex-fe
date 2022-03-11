/* eslint-disable react/react-in-jsx-scope */
import React, { useEffect, useState, useMemo } from 'react';
import styled from 'styled-components'
import { Text, Flex, ArrowBackIcon, ArrowForwardIcon } from '@onidex-libs/uikit'
import formatTime from 'utils/date'
import { formatDollarAmount, formatAmount } from 'utils/formatBalance'
import { PageButtons, Arrow } from '../PairInfo/shared'

const ITEMS_PER_TRADE_TABLE_PAGE = 10;

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

const MarketTrades = ({ transactions }) => {
  // pagination
  const [pageTrade, setPageTrade] = useState(1)
  const [marketMaxPage, setMarketMaxPage] = useState(1)
  
  useEffect(() => {
    if (transactions){
      let extraPages = 1
      if (transactions.length % ITEMS_PER_TRADE_TABLE_PAGE === 0) {
        extraPages = 0
      }
      setMarketMaxPage(Math.floor(transactions.length / ITEMS_PER_TRADE_TABLE_PAGE) + extraPages)
      setPageTrade(1);
    }
  }, [transactions])

  const renderTradeData = useMemo(() => {
    return transactions ?
      transactions.filter((_, i) => i >= (pageTrade-1) * ITEMS_PER_TRADE_TABLE_PAGE && i < pageTrade * ITEMS_PER_TRADE_TABLE_PAGE)
      :
      []
  }, [transactions, pageTrade])

  return (
    <OrderBookCard>
        <ContentContainer>

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
                    renderTradeData.map((_t, index) => {
                        const abs0 = Math.abs(_t.amountToken0)
                        const abs1 = Math.abs(_t.amountToken1)

                        return (
                        <tr className="order_book_table_body" key={`${_t.hash}-${index}`}>
                            <td style={{ color: _t.tradeAmt > 0 ? '#1BC870' : '#1BC870' }}>
                            {formatTime(_t.timestamp, 0)}
                            </td>
                            <td style={{ color: _t.tradeAmt > 0 ? '#1BC870' : '#1BC870', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Flex flexDirection="column" alignItems="center" justifyContent="center">
                                <Flex mb="4px">
                                {`${formatAmount(abs0)}`}
                                <p style={{color: '#787878', fontSize: '12px'}}>&nbsp;{`${_t.token0Symbol}->`}</p>
                                </Flex>
                                <Flex> 
                                <p style={{color: '#EF5350', fontSize: '12px'}}>{`${formatAmount(abs1)}`}</p>
                                <p style={{color: '#787878', fontSize: '12px'}}>&nbsp;{`${_t.token1Symbol}`}</p>
                                </Flex>
                            </Flex>
                            </td>
                            <td style={{ color: _t.tradeAmt > 0 ? '#1BC870' : '#1BC870' }}>
                            {formatDollarAmount(_t.amountUSD)}
                            </td>
                        </tr>
                        )
                    })
                    }
                </tbody>
            </table>
            <PageButtons>
                <Arrow
                    onClick={() => {
                        setPageTrade(pageTrade === 1 ? pageTrade : pageTrade - 1)
                    }}
                >
                    <ArrowBackIcon color={pageTrade === 1 ? 'textDisabled' : 'primary'} />
                </Arrow>

                <Text>{`Page ${pageTrade} of ${marketMaxPage}`}</Text>

                <Arrow
                    onClick={() => {
                        setPageTrade(pageTrade === marketMaxPage ? pageTrade : pageTrade + 1)
                    }}
                >
                    <ArrowForwardIcon color={pageTrade === marketMaxPage ? 'textDisabled' : 'primary'} />
                </Arrow>
            </PageButtons>
        </ContentContainer>
    </OrderBookCard>
  )
}

export default MarketTrades
