import { useEffect, useState } from 'react';
import { request, gql } from 'graphql-request'
import { INFO_CLIENT } from 'config/constants/endpoints'

const useTokenData = (tokenAddress: string, yesterdayDate: number) => {
  const [tokenData, setTokenData] = useState(null);

  // console.log('ant : useTokenData ');
  useEffect(() => {
    const fetchTokenData = async () => {
      try {
        const query = gql`
          query token {
            token(id: "${tokenAddress.toLowerCase()}") {
              id
              decimals
              tradeVolume
              tradeVolumeUSD
              totalLiquidity
              derivedBNB
              derivedUSD
              tokenDayData(where: {
                date_gt: ${yesterdayDate}
              }) {
                id
                date
                dailyVolumeToken
                dailyVolumeUSD
                dailyVolumeBNB
                totalLiquidityBNB
                totalLiquidityUSD
                totalLiquidityToken
                priceUSD
              }
            }
          }
        `

        // console.log('ant: query => ', query);
        const data = await request(INFO_CLIENT, query);
        // console.log('ant : INFO_CLIENT data => ', data);
        setTokenData(data);
        // return null;
        // return { data, error: false }
      } catch (error) {
        console.error('Failed to fetch token data', error)
        // return { error: true }
      }
    };

    fetchTokenData();
  }, [tokenAddress, yesterdayDate]);
  
  return tokenData;
};

export default useTokenData;