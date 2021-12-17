import { useState, useEffect, useMemo } from 'react'
import { useQuery } from '@apollo/client'
import { request, gql } from 'graphql-request'
import gqlTag from 'graphql-tag'

import { INFO_CLIENT } from 'config/constants/endpoints'
import { TOKEN_BLACKLIST } from 'config/constants/info'
import { getDeltaTimestamps } from 'views/Pools/utils/infoQueryHelpers'
import { useClients } from 'state/application/hooks'
import { fetchPoolsForToken } from 'data/tokens/poolsForToken'

interface TopPoolsResponse {
  pairDayDatas: {
    id: string
  }[]
}

interface TopPoolsResponseUniswap {
  pools: {
    id: string
  }[]
}

export const TOP_POOLS = gqlTag`
  query topPools {
    pools(first: 50, orderBy: totalValueLockedUSD, orderDirection: desc, subgraphError: allow) {
      id
    }
  }
`
/**
 * Initial pools to display on the home page
 */
const fetchTopPools = async (timestamp24hAgo: number): Promise<string[]> => {
  try {
    const query = gql`
      query topPools($blacklist: [String!], $timestamp24hAgo: Int) {
        pairDayDatas(
          first: 30
          where: { dailyTxns_gt: 300, token0_not_in: $blacklist, token1_not_in: $blacklist, date_gt: $timestamp24hAgo }
          orderBy: dailyVolumeUSD
          orderDirection: desc
        ) {
          id
        }
      }
    `
    const data = await request<TopPoolsResponse>(INFO_CLIENT, query, { blacklist: TOKEN_BLACKLIST, timestamp24hAgo })
    // pairDayDatas id has compound id "0xPOOLADDRESS-NUMBERS", extracting pool address with .split('-')
    // console.log("data.pairDayDatas ::", data.pairDayDatas)
    return data.pairDayDatas.map((p) => p.id.split('-')[0])
  } catch (error) {
    console.error('Failed to fetch top pools', error)
    return []
  }
}

/**
 * Fetch top addresses by volume
 */
const useTopPoolAddressesForToken = (address: string): string[] => {
  const [topPoolAddresses, setTopPoolAddresse] = useState([])
  // const [timestamp24hAgo] = getDeltaTimestamps()
  const { dataClient } = useClients()
  useEffect(() => {
    const fetch = async () => {
      // const addresses = await fetchTopPools(timestamp24hAgo)
      const { loading, error, addresses } = await fetchPoolsForToken(address.toLowerCase(), dataClient)
      setTopPoolAddresse(addresses)
    }
    if (topPoolAddresses.length === 0) {
      fetch()
    }
  }, [topPoolAddresses, dataClient, address])

  return topPoolAddresses
}

/**
 * Fetch top addresses by volume
 */
 export function useTopPoolAddresses(): {
  loading: boolean
  error: boolean
  addresses: string[] | undefined
} {
  const { dataClient } = useClients()
  const { loading: dataLoading, error, data } = useQuery<TopPoolsResponseUniswap>(TOP_POOLS, {
    client: dataClient,
    fetchPolicy: 'cache-first',
  })

  const formattedData = useMemo(() => {
    if (data) {
      return data.pools.map((p) => p.id)
    }
    return undefined
  }, [data])

  return {
    loading: dataLoading,
    error: Boolean(error),
    addresses: formattedData,
  }
}

export default useTopPoolAddresses
