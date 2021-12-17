import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useToken } from 'hooks/useTokens';
import BotPanel from './BotPanel/BotPanel';
import DexPanel from './DexPanel/DexPanel';
import TokenSelector from './TokenSelector';
import { UNITOKEN } from '../../constants';

const Page = styled.div`
  padding: 16px;
`;

const PriceBotContainer = styled.div`
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;

  .dex-container {
    width: 100%;

    ${({ theme }) => theme.mediaQueries.lg} {
      width: 50%;
      padding-right: 32px;
    }
  }

  .bot-container {
    width: 100%;

    ${({ theme }) => theme.mediaQueries.lg} {
      width: 50%;
    }
  }
`;

const MESSAGE_OPTIONS = [
  { label: 'Symbol', value: 'symbol' },
  { label: 'Tokens per native', value: 'tokensPerNative' },
  { label: 'Price', value: 'price' },
  { label: 'Supply', value: 'circulatingSupply' },
  { label: 'Total Supply', value: 'totalSupply' },
  { label: 'Marketcap', value: 'marketCap' },
  { label: 'Liquidity', value: 'liquidity' },
  { label: 'Value Locked', value: 'tvl' },
  { label: 'Holders', value: 'holders' },
  { label: 'Daily Volume', value: 'dailyVolume' },
  { label: 'Daily Change', value: 'dailyChange' },
]

const PriceBot = () => {
  const [messageOptions, setMessageOptions] = useState(MESSAGE_OPTIONS.map(option => ({
    label: option.label,
    value: option.value,
    active: false
  })));
  const [activeDex, setActiveDex] = useState('Pancake');
  const [activeChain, setActiveChain] = useState('bsc');
  const [chartType, setChartType] = useState(1);
  const [messageType, setMessageType] = useState(1);
  const [tokenAddress, setTokenAddress] = useState(UNITOKEN);
  const selectedCurrency = useToken(tokenAddress);

  const data = useMemo(() => {
    let apiParams = {
      swap: activeDex,
      network: activeChain,
      chartType: chartType ? 'line' : 'candlestick',
      chart: messageType ? 0 : 1,
      message: '',
      tokenAddress,
    };
  
    // eslint-disable-next-line no-restricted-syntax
    for (const option of messageOptions) {
      apiParams = {
        ...apiParams,
        [option.value]: option.active ? 1 : 0
      }
    }

    return apiParams;
  }, [messageOptions, activeDex, activeChain, chartType, messageType, tokenAddress]);

  const handleSetCurrency = currency => {
    setTokenAddress(currency.address);
  };

  return (
    <Page>
      <TokenSelector 
        selectedCurrency={selectedCurrency} 
        isMobile 
        onSetCurrency={handleSetCurrency} />
      <PriceBotContainer>
        <div className='dex-container'>
          <DexPanel 
            messageOptions={messageOptions}
            activeDex={activeDex}
            activeChain={activeChain}
            chartType={chartType}
            messageType={messageType}
            onChangeMessageType={setMessageType}
            onChangeChartType={setChartType}
            onChangeActiveChain={setActiveChain}
            onChangeActiveDex={setActiveDex} 
            onChangeMessageOptions={setMessageOptions} />
        </div>
        <div className='bot-container'>
          <BotPanel apiParams={data} />
        </div>
      </PriceBotContainer>
    </Page>
  );
};

export default PriceBot;