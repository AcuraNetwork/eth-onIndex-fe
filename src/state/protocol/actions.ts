import { createAction } from '@reduxjs/toolkit'
import { ChartDayData, Transaction } from 'types'
import { SupportedNetwork } from 'constants/networks'

export const updateChartData = createAction<{ chartData: ChartDayData[]; networkId: SupportedNetwork }>(
  'protocol/updateChartData'
)
export const updateTransactions = createAction<{ transactions: Transaction[]; networkId: SupportedNetwork }>(
  'protocol/updateTransactions'
)
export const updateLimitOrders = createAction<{ limitOrders: any[]; networkId: SupportedNetwork }>(
  'protocol/updateLimitOrders'
)
export const updateLimitOrderParams = createAction<{ page: number; tokenAddress: string; networkId: SupportedNetwork }>(
  'protocol/updateLimitOrderParams'
)
export const updateLimitOrderPage = createAction<number>(
  'protocol/updateLimitOrderPage'
)
export const updateLimitOrderTokenAddress = createAction<string>(
  'protocol/updateLimitOrderTokenAddress'
)

