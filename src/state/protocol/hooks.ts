import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ChartDayData, Transaction } from 'types'
import { useActiveNetworkVersion } from 'state/application/hooks'
import { updateChartData, updateTransactions, updateLimitOrders } from './actions'
import { AppState, AppDispatch } from '../index'

export function useProtocolChartData(): [ChartDayData[] | undefined, (chartData: ChartDayData[]) => void] {
  const [activeNetwork] = useActiveNetworkVersion()
  const chartData: ChartDayData[] | undefined = useSelector(
    (state: AppState) => state.protocol[activeNetwork.id]?.chartData
  )

  const dispatch = useDispatch<AppDispatch>()
  const setChartData: (chartData: ChartDayData[]) => void = useCallback(
    (chartData: ChartDayData[]) => dispatch(updateChartData({ chartData, networkId: activeNetwork.id })),
    [activeNetwork.id, dispatch]
  )
  return [chartData, setChartData]
}

export function useProtocolTransactions(): [Transaction[] | undefined, (transactions: Transaction[]) => void] {
  const [activeNetwork] = useActiveNetworkVersion()
  const transactions: Transaction[] | undefined = useSelector(
    (state: AppState) => state.protocol[activeNetwork.id]?.transactions
  )
  const dispatch = useDispatch<AppDispatch>()
  const setTransactions: (transactions: Transaction[]) => void = useCallback(
    (transactions: Transaction[]) => dispatch(updateTransactions({ transactions, networkId: activeNetwork.id })),
    [activeNetwork.id, dispatch]
  )
  return [transactions, setTransactions]
}

export function useLimitOrders(): [any[] | undefined, (limitOrders: any[]) => void] {
  const [activeNetwork] = useActiveNetworkVersion()
  const limitOrders: any[] | undefined = useSelector(
    (state: AppState) => state.protocol[activeNetwork.id]?.limitOrders
  )
  const dispatch = useDispatch<AppDispatch>()
  const setLimitOrders: (limitOrders: any[]) => void = useCallback(
    (limitOrders: any[]) => dispatch(updateLimitOrders({ limitOrders, networkId: activeNetwork.id })),
    [activeNetwork.id, dispatch]
  )
  return [limitOrders, setLimitOrders]
}

export function useLimitOrdersParam(): [number, string | undefined] {
  const [activeNetwork] = useActiveNetworkVersion()
  const page: number = useSelector(
    (state: AppState) => state.protocol[activeNetwork.id]?.page
  )
  const tokenAddress: string | undefined = useSelector(
    (state: AppState) => state.protocol[activeNetwork.id]?.tokenAddress
  )
  
  return [page, tokenAddress]
}
