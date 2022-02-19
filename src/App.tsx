import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ResetCSS } from '@onidex-libs/uikit'
import BigNumber from 'bignumber.js'
import { useFetchPublicData } from 'state/hooks'
import useEagerConnect from 'hooks/useEagerConnect'
import MobileFooter from 'components/MobileFooter'
import GlobalStyle from './style/Global'
import Menu from './components/Menu'
import Web3ReactManager from './components/Web3ReactManager';

// Route-based code splitting
const Home = lazy(() => import('./views/Home'))
const PoolsExplorer = lazy(() => import('./views/Pools'))
const PriceBot = lazy(() => import('./views/PriceBot'))
const Farms = lazy(() => import("./views/Farms"))
const Swap = lazy(() => import('./views/Swap'))
const NotFound = lazy(() => import('./views/NotFound'))

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const App: React.FC = () => {

  useEagerConnect()
  useFetchPublicData()

  return (
    <Router>
      <ResetCSS />
      <GlobalStyle />
      <Menu>
        <Suspense fallback={null}>
          <Web3ReactManager>
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path='/token/:tokenAddress' exact>
                <Home />
              </Route>
              <Route path="/polystake">
                <Farms />
              </Route>
              <Route path="/swap">
                <Swap />
              </Route>
              <Route path="/pools">
                <PoolsExplorer />
              </Route>
              <Route path="/price-bot">
                <PriceBot />
              </Route>
              <Route component={NotFound} />
            </Switch>
          </Web3ReactManager>
        </Suspense>
        <MobileFooter />
      </Menu>
    </Router>
  )
}

export default React.memo(App)
