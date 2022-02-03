import { useEffect, useState } from 'react'
import axios from 'axios'

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/simple/'

const useGetInputCurrencyUsd = (input) => {
  const [usdPrice, setUsdPrice] = useState(0)

  useEffect(() => {
    const get = async () => {
      const endpoint = input.symbol === 'ETH'
        ? `${COINGECKO_API_URL}price?ids=ethereum&vs_currencies=usd`
        : `${COINGECKO_API_URL}token_price/ethereum?contract_addresses=${input.address}&vs_currencies=usd`
      
      axios.get(endpoint).then((response) => {
        if (response.status === 200) {
          setUsdPrice(input?.symbol === 'ETH' ? response.data.ethereum?.usd : response.data[`${input.address.toLowerCase()}`]?.usd)
        }
      })
    }
    if (input !== undefined && input) {
      get()
    }
  }, [input])

  return usdPrice
}

export default useGetInputCurrencyUsd
