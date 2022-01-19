import { createReducer } from '@reduxjs/toolkit'
import { ChartDayData, Transaction } from 'types'
import { SupportedNetwork } from 'constants/networks'
import { updateChartData, updateTransactions } from './actions'

export interface ProtocolData {
  // volume
  volumeUSD: number
  volumeUSDChange: number

  // in range liquidity
  tvlUSD: number
  tvlUSDChange: number

  // fees
  feesUSD: number
  feeChange: number

  // transactions
  txCount: number
  txCountChange: number
}

export interface ProtocolState {
  [networkId: string]: {
    // timestamp for last updated fetch
    readonly lastUpdated: number | undefined
    // overview data
    readonly data: ProtocolData | undefined
    readonly chartData: ChartDayData[] | undefined
    readonly transactions: Transaction[] | undefined
  }
}

export const initialState: ProtocolState = {
  [SupportedNetwork.ETHEREUM]: {
    data: undefined,
    chartData: undefined,
    transactions: undefined,
    lastUpdated: undefined,
  },
  [SupportedNetwork.ARBITRUM]: {
    data: undefined,
    chartData: undefined,
    transactions: undefined,
    lastUpdated: undefined,
  },
  [SupportedNetwork.OPTIMISM]: {
    data: undefined,
    chartData: undefined,
    transactions: undefined,
    lastUpdated: undefined,
  },
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(updateChartData, (state, { payload: { chartData, networkId } }) => {
      state[networkId].chartData = chartData
    })
    .addCase(updateTransactions, (state, { payload: { transactions, networkId } }) => {
      state[networkId].transactions = transactions
    })
)
