import { useEffect } from 'react'
import useAuth from 'hooks/useAuth'
import { connectorLocalStorageKey, ConnectorNames } from 'utils/web3React'

const _binanceChainListener = async () =>
  new Promise<void>((resolve) =>
    Object.defineProperty(window, 'BinanceChain', {
      get() {
        return this.bsc
      },
      set(bsc) {
        this.bsc = bsc

        resolve()
      },
    }),
  )

const useEagerConnect = () => {
  const { login } = useAuth()
  const connectorId = window.localStorage.getItem(connectorLocalStorageKey) as ConnectorNames

  useEffect(() => {
    const userInfoStorage = JSON.parse(window.localStorage.getItem("userInfo"))

    if (connectorId && userInfoStorage) {
      const isConnectorBinanceChain = connectorId === ConnectorNames.BSC
      const isBinanceChainDefined = Reflect.has(window, 'BinanceChain')

      if (isConnectorBinanceChain && !isBinanceChainDefined) {
        _binanceChainListener().then(() => login(connectorId))
        return
      }
      login(connectorId)
    } 
  }, [login, connectorId])
}

export default useEagerConnect
