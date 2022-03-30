// @ts-nocheck

import React, { useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import { Flex } from '@onidex-libs/uikit';
import Page from 'components/layout/Page'

import { useProtocolTransactions, useLimitOrders } from 'state/protocol/hooks'
import { updateLimitOrderTokenAddress } from 'state/protocol/actions';
import { AppDispatch } from 'state'
import useTokenInfo from 'hooks/useTokenInfo';
import { useToken } from 'hooks/useTokens';
import useLocalStorageState from 'hooks/useLocalStorageState';
import CurrencySelector from './components/CurrencySelector';
import TransactionHeader from './components/TransactionHeader';
import TVChartContainer from './components/TVChartContainer';
import OrderBook from './components/OrderBook/OrderBook';
import { UNITOKEN } from '../../constants';
import PairInfo from './components/PairInfo';
import TradingCard from './components/TradingCard';
import TradeSection from './components/Spot/TradeSection';
import HistorySection from './components/Spot/HistorySection';
import BottomSection from './components/Spot/BottomSection';
import HomeFooter from './components/HomeFooter'

const StyledPage = styled(Page)`
  padding: 8px;
  max-width: 100%;

  article {
    div {
      width: 100% !important;
    }
  }

  .header {
    display: none;
    ${({ theme }) => theme.mediaQueries.sm} {
      display: block;
    }
  }

  .header-mobile {
    display: block;
    ${({ theme }) => theme.mediaQueries.sm} {
      display: none;
    }
  }

  .currency-selector {
    display: block;
    margin-bottom: 16px;
    ${({ theme }) => theme.mediaQueries.sm} {
      display: none;
      margin-bottom: 0;
    }
  }
  /* @media screen and (max-width: 768px) {
    flex-direction: column;
  } */
`;
const PageFlex = styled(Flex)`
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`
const ChartFlex = styled(Flex)`
  @media screen and (max-width: 1144px) {
    flex-direction: column;
  }
`
const TokenDetails = styled.div`
  width: 100%;
`;

const ChartContent = styled(Flex)`
  width: 100%;
`;

const WebPage = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 576px) {
    display: none;
  }
`
const MobilePage = styled.div`
  display: none;
  @media screen and (max-width: 576px) {
    display: flex;
    flex-direction: column;
    border-radius: 20px 20px 0;
  }
`

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()

  const params = useParams();
  const history = useHistory();
  const address = params.tokenAddress ? params.tokenAddress : UNITOKEN;
  const [jwtToken, setJwtToken] = useLocalStorageState('jwtToken');
  const selectedTokenInfo = useTokenInfo(address, jwtToken);

  const [transactions] = useProtocolTransactions()
  const [limitOrders] = useLimitOrders()

  const selectedCurrency = useToken(params.tokenAddress ? params.tokenAddress : UNITOKEN);

  useEffect(() => {
    const apiParams = new URLSearchParams();
    apiParams.append('password', process.env.REACT_APP_JWT_TOKEN);

    const fetchJwtToken = async () => {
      try {
        const response = await axios.post(`https://dapp-backend-bsc.vercel.app/auth`, apiParams, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
        setJwtToken({
          time: new Date().getTime(),
          jwtToken: response.data.token
        });
      } catch (error) {
        console.error('ant : Token Error => ', error);
      }
    };

    if (!jwtToken || (new Date().getTime() - jwtToken.time) >= 86400000) {
      fetchJwtToken();
    } 
  }, [jwtToken, setJwtToken]);

  useEffect(() => {
    dispatch(updateLimitOrderTokenAddress(params.tokenAddress ? params.tokenAddress : UNITOKEN))
  }, [dispatch, params.tokenAddress]);

  const handleSetCurrency = currency => {
    dispatch(updateLimitOrderTokenAddress(currency.address))
    history.push(`/token/${currency.address}`);
  }

  return (
    <StyledPage> 
      {selectedCurrency && 
        <WebPage>
          <PageFlex>
            {/* <PolySwap /> */}
            <OrderBook selectedTokenInfo={selectedTokenInfo} orderLimitData = {limitOrders === undefined ? null : limitOrders} selectedCurrency={selectedCurrency}/>
            <ChartContent flexDirection='column'>
              <div className='header'>
                <TransactionHeader
                  isMobile={false} 
                  selectedCurrency={selectedCurrency}
                  selectedTokenInfo={selectedTokenInfo} 
                  onSetCurrency={handleSetCurrency} />
              </div>
              <ChartFlex>
                <TokenDetails>
                  <div className='currency-selector'>
                    <CurrencySelector onSetCurrency={handleSetCurrency} />
                  </div>
                  <TVChartContainer jwtToken={jwtToken} containerId='tv_chart_container' selectedCurrency={selectedCurrency} />
                  {/* <PriceBotChartContainer>
                    <TVChartContainer containerId='price_tv_chart_container' priceBot selectedCurrency={priceBotCurrency} />
                  </PriceBotChartContainer> */}
                  <div className='header-mobile'>
                    <TransactionHeader 
                      isMobile 
                      selectedCurrency={selectedCurrency}
                      selectedTokenInfo={selectedTokenInfo} 
                      onSetCurrency={handleSetCurrency} />
                  </div>
                  {/* <HomeBgContainer /> */}
                  <Flex mt='8px' justifyContent='space-between'>
                    <TradingCard />
                  </Flex>
                </TokenDetails>
                <PairInfo selectedTokenInfo={selectedTokenInfo} transactions={transactions === undefined ? null : transactions}/>
              </ChartFlex>
            </ChartContent>
          </PageFlex>
          <HomeFooter />
        </WebPage>
      }
      {selectedCurrency && 
        <MobilePage>
          <div className='currency-selector'>
            <CurrencySelector isMobile onSetCurrency={handleSetCurrency} />
          </div>
          <Flex>
            <TradeSection selectedTokenInfo={selectedCurrency}/>
            <HistorySection selectedTokenInfo={selectedTokenInfo} orderLimitData = {limitOrders === undefined ? null : limitOrders} selectedCurrency={selectedCurrency}/>
            {/* <OrderBook selectedTokenInfo={selectedTokenInfo} orderLimitData = {limitOrders === undefined ? null : limitOrders} selectedCurrency={selectedCurrency}/> */}
          </Flex>
          <BottomSection
            jwtToken={jwtToken}
            containerId='tv_chart_container_mobile'
            selectedCurrency={selectedCurrency}
            orderLimitData = {limitOrders === undefined ? null : limitOrders}
            selectedTokenInfo={selectedTokenInfo}
            transactions={transactions === undefined ? null : transactions}
          />
        </MobilePage>
      }
    </StyledPage>
  )
}

export default Home
