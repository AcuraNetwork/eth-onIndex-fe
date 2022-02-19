import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Providers from './Providers'

import ApplicationUpdater from './state/application/updater'
import ListsUpdater from './state/tokens/updater'
import MulticallUpdater from './state/multicall/updater'
import ProtocolUpdater from './state/protocol/updater'

ReactDOM.render(
  <Providers>
    <ListsUpdater />
    <ApplicationUpdater />
    <MulticallUpdater />
    <ProtocolUpdater />
    <App />
  </Providers>,
  document.getElementById('root'),
)
