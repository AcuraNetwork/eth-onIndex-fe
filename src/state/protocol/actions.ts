import { createAction } from '@reduxjs/toolkit'
import { ChartDayData, Transaction } from 'types'
import { SupportedNetwork } from 'constants/networks'

export const updateChartData = createAction<{ chartData: ChartDayData[]; networkId: SupportedNetwork }>(
  'protocol/updateChartData'
)
export const updateTransactions = createAction<{ transactions: Transaction[]; networkId: SupportedNetwork }>(
  'protocol/updateTransactions'
)
