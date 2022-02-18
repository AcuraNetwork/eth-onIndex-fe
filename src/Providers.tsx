import React from 'react'
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'
import { ModalProvider } from '@onidex-libs/uikit'
import * as bsc from '@binance-chain/bsc-use-wallet'
import { Provider } from 'react-redux'
import getRpcUrl from 'utils/getRpcUrl'
import { LanguageContextProvider } from 'contexts/Localisation/languageContext'
import { ThemeContextProvider } from 'contexts/ThemeContext'
import { BlockContextProvider } from 'contexts/BlockContext'
import { RefreshContextProvider } from 'contexts/RefreshContext'
import store from 'state'
import getLibrary from 'utils/getLibrary';
import { ApolloProvider } from '@apollo/client/react'
import { client } from 'apollo/client'

const Web3ProviderNetwork = createWeb3ReactRoot('NETWORK')

const Providers: React.FC = ({ children }) => {
  const rpcUrl = getRpcUrl()
  const chainId = parseInt(process.env.REACT_APP_CHAIN_ID);
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
        <ApolloProvider client={client}>
          <Provider store={store}>
            <ThemeContextProvider>
              <LanguageContextProvider>
                <bsc.UseWalletProvider
                  chainId={chainId}
                  connectors={{
                    walletconnect: { rpcUrl },
                    bsc,
                  }}
                >
                  <BlockContextProvider>
                    <RefreshContextProvider>
                      <ModalProvider>{children}</ModalProvider>
                    </RefreshContextProvider>
                  </BlockContextProvider>
                </bsc.UseWalletProvider>
              </LanguageContextProvider>
            </ThemeContextProvider>
          </Provider>
        </ApolloProvider>
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  )
}

export default Providers
