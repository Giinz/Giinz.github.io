import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IInitStateOrder, IOrder } from './types/IOrder'

const initialState: IInitStateOrder = {
  isLoading: false,
  orderList: []
}
export const OrderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrderToList: (state, action: PayloadAction<IOrder>) => {
      state.orderList = [...state.orderList, action.payload]
    },
    updateCurrentOrder: (state, action: PayloadAction<IOrder>) => {
      state.orderList = state.orderList.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload
        }
        return item
      })
    }
  }
})

export const { addOrderToList, updateCurrentOrder } = OrderSlice.actions

export default OrderSlice.reducer
