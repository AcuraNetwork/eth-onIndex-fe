import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import {
  arbitrumBlockClient,
  arbitrumClient,
  blockClient,
  client,
  optimismClient,
  optimismBlockClient,
} from 'apollo/client'
import { NetworkInfo, SupportedNetwork } from 'constants/networks'
import { AppState } from '../index'
import { addPopup, PopupContent, updateActiveNetworkVersion } from './actions'

export function useBlockNumber(): number | undefined {
  // const { chainId } = useActiveWeb3React()
  const chainId = process.env.REACT_APP_CHAIN_ID;

  return useSelector((state: AppState) => state.application.blockNumber[chainId ?? -1])
}

// returns a function that allows adding a popup
export function useAddPopup(): (content: PopupContent, key?: string) => void {
  const dispatch = useDispatch()

  return useCallback(
    (content: PopupContent, key?: string) => {
      dispatch(addPopup({ content, key }))
    },
    [dispatch]
  )
}


// returns a function that allows adding a popup
export function useActiveNetworkVersion(): [NetworkInfo, (activeNetworkVersion: NetworkInfo) => void] {
  const dispatch = useDispatch()
  const activeNetwork = useSelector((state: AppState) => state.application.activeNetworkVersion)
  const update = useCallback(
    (activeNetworkVersion: NetworkInfo) => {
      dispatch(updateActiveNetworkVersion({ activeNetworkVersion }))
    },
    [dispatch]
  )
  return [activeNetwork, update]
}

// get the apollo client related to the active network
export function useDataClient(): ApolloClient<NormalizedCacheObject> {
  const [activeNetwork] = useActiveNetworkVersion()
  switch (activeNetwork.id) {
    case SupportedNetwork.ETHEREUM:
      return client
    case SupportedNetwork.ARBITRUM:
      return arbitrumClient
    case SupportedNetwork.OPTIMISM:
      return optimismClient
    default:
      return client
  }
}

// get the apollo client related to the active network for fetching blocks
export function useBlockClient(): ApolloClient<NormalizedCacheObject> {
  const [activeNetwork] = useActiveNetworkVersion()
  switch (activeNetwork.id) {
    case SupportedNetwork.ETHEREUM:
      return blockClient
    case SupportedNetwork.ARBITRUM:
      return arbitrumBlockClient
    case SupportedNetwork.OPTIMISM:
      return optimismBlockClient
    default:
      return blockClient
  }
}

// Get all required subgraph clients
export function useClients(): {
  dataClient: ApolloClient<NormalizedCacheObject>
  blockClient: ApolloClient<NormalizedCacheObject>
} {
  const dataClient = useDataClient()
  const blkClient = useBlockClient()
  return {
    dataClient,
    blockClient: blkClient,
  }
}

export default useBlockNumber;