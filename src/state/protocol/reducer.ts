import { createReducer } from '@reduxjs/toolkit'
import { ChartDayData, Transaction } from 'types'
import { SupportedNetwork } from 'constants/networks'
import {
  updateChartData,
  updateLimitOrders,
  updateTransactions,
  updateLimitOrderParams,
  updateLimitOrderPage,
  updateLimitOrderTokenAddress
} from './actions'

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
    readonly limitOrders: any[] | undefined
    readonly page: number
    tokenAddress: string | undefined
  };
}

export const initialState: ProtocolState = {
  [SupportedNetwork.ETHEREUM]: {
    data: undefined,
    chartData: undefined,
    transactions: undefined,
    lastUpdated: undefined,
    limitOrders: undefined,
    page: 1,
    tokenAddress: null,
  },
  [SupportedNetwork.ARBITRUM]: {
    data: undefined,
    chartData: undefined,
    transactions: undefined,
    lastUpdated: undefined,
    limitOrders: undefined,
    page: 1,
    tokenAddress: null,
  },
  [SupportedNetwork.OPTIMISM]: {
    data: undefined,
    chartData: undefined,
    transactions: undefined,
    lastUpdated: undefined,
    limitOrders: undefined,
    page: 1,
    tokenAddress: null,
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
    .addCase(updateLimitOrders, (state, { payload: { limitOrders, networkId } }) => {
      state[networkId].limitOrders = limitOrders
    })
    .addCase(updateLimitOrderParams, (state, { payload: { page, tokenAddress, networkId } }) => {
      state[networkId].page = page
      state[networkId].tokenAddress = tokenAddress
    })
    .addCase(updateLimitOrderTokenAddress, (state, { payload: tokenAddress }) => {
      state[SupportedNetwork.ETHEREUM].tokenAddress = tokenAddress
    })
    .addCase(updateLimitOrderPage, (state, { payload: page }) => {
      state[SupportedNetwork.ETHEREUM].page = page
    })
)
