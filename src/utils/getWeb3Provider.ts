import Web3 from 'web3'
import getNodeUrl from './getRpcUrl'

const getWeb3Provider = () => {
  const nodeUrl = getNodeUrl()
  return new Web3(new Web3.providers.HttpProvider(nodeUrl))
}

export default getWeb3Provider
