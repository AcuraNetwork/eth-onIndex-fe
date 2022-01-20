import { useState, useEffect } from 'react'
import { UNITOKEN, USDTTOKEN } from '../constants'
import { axiosGetMain } from '../moralisApi'

// import { SupportedChainId } from '../connectors'
// import { DAI_OPTIMISM, USDC, USDC_ARBITRUM } from '../constants/tokens'
// import { useBestV2Trade } from './useBestV2Trade'
// import { useClientSideV3Trade } from './useClientSideV3Trade'
// import { useActiveWeb3React } from './web3'

// Stablecoin amounts used when calculating spot price for a given currency.
// The amount is large enough to filter low liquidity pairs.
// const STABLECOIN_AMOUNT_OUT: { [chainId: number]: CurrencyAmount<Token> } = {
//   [SupportedChainId.MAINNET]: CurrencyAmount.fromRawAmount(USDC, 100_000e6),
//   [SupportedChainId.ARBITRUM_ONE]: CurrencyAmount.fromRawAmount(USDC_ARBITRUM, 10_000e6),
//   [SupportedChainId.OPTIMISM]: CurrencyAmount.fromRawAmount(DAI_OPTIMISM, 10_000e18),
// }

/**
 * Returns the price in USDC of the input currency
 * @param currency currency to compute the USDC price of
 */
export const getUSDPrices = async (addresses: string[]) => {
   const calls = addresses.map(async (address: string)=> {
     return await axiosGetMain(`erc20/${address}/price`)
   })
   const prices = await Promise.all(calls).then(values => values)
   return prices
}

export const useUniUsdPrice = () => {
  const [uniPrice, setUniPrice] = useState(0)

  useEffect(() => {
    const fetch = async () => {
      const price = await getUSDPrices([UNITOKEN])
      if (price[0].data) {
        setUniPrice(price[0].data.usdPrice)
      }
    }
    fetch()
  }, [])

  return uniPrice
}
export const useUSDTUsdPrice = () => {
  const [usdtPrice, setUsdtPrice] = useState(0)

  useEffect(() => {
    const fetch = async () => {
      const price = await getUSDPrices([USDTTOKEN])
      if (price[0].data) {
        setUsdtPrice(price[0].data.usdPrice)
      }
    }
    fetch()
  }, [])

  return usdtPrice
}

// export function useUSDCValue(currencyAmount: CurrencyAmount<Currency> | undefined | null) {
//   const price = useUSDCPrice(currencyAmount?.currency)

//   return useMemo(() => {
//     if (!price || !currencyAmount) return null
//     try {
//       return price.quote(currencyAmount)
//     } catch (error) {
//       return null
//     }
//   }, [currencyAmount, price])
// }
