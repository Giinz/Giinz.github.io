import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IInitStateOrder, IOrder } from './types/IOrder'

const initialState: IInitStateOrder = {
  isLoading: false,
  orderList: [],
  totalPrice: 0,
  discount: 0,
  priceType: 1
}
export const OrderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    updateOrderDiscount: (state, action: PayloadAction<number>) => {
      state.discount = action.payload
    },
    updateOrderPriceType: (state, action: PayloadAction<number>) => {
      state.priceType = action.payload
    },
    addOrderToList: (state, action: PayloadAction<IOrder>) => {
      state.orderList = [...state.orderList, action.payload]
      state.totalPrice = state.orderList.reduce((total, item) => total + item.total, 0)
    },
    updateCurrentOrder: (state, action: PayloadAction<IOrder>) => {
      state.orderList = state.orderList.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload
        }
        return item
      })
      state.totalPrice = state.orderList.reduce((total, item) => total + item.total, 0)
    },
    deleteOrderItem: (state, action: PayloadAction<IOrder>) => {
      const newOrderList = state.orderList.filter((item) => item.id !== action.payload.id)
      state.orderList = newOrderList
    },
    deleteEntireOrder: (state) => {
      state.orderList = []
      state.totalPrice = 0
      state.discount = 0
      state.priceType = 1
    }
  }
})

export const {
  addOrderToList,
  updateCurrentOrder,
  updateOrderDiscount,
  updateOrderPriceType,
  deleteOrderItem,
  deleteEntireOrder
} = OrderSlice.actions

export default OrderSlice.reducer
