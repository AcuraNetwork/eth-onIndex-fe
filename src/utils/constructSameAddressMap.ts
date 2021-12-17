import { L1_CHAIN_IDS, SupportedChainId } from '../connectors'

export default function constructSameAddressMap<T extends string>(
  address: T,
  additionalNetworks: SupportedChainId[] = []
): { [chainId: number]: T } {
  return (L1_CHAIN_IDS as readonly SupportedChainId[])
    .concat(additionalNetworks)
    .reduce<{ [chainId: number]: T }>((memo, chainId) => {
      memo[chainId] = address
      return memo
    }, {})
}
