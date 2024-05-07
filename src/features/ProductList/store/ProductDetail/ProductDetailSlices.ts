/* eslint-disable @typescript-eslint/no-unused-vars */
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IProduct } from '../../type/IProduct'

export interface IInitState {
  productDetail?: IProduct | null
  isLoading: boolean
}
export interface IActionGetListProduct {
  page: number
  pageSize: number
}

const initialState: IInitState = {
  isLoading: false,
  productDetail: null
}

export const productDetailSlices = createSlice({
  name: 'product',
  initialState: initialState,
  reducers: {
    requestProductDetailFailure: (state) => {
      state.isLoading = false
    },

    getProductDetail: (state, _action: PayloadAction<IProduct>) => {
      state.isLoading = true
    },
    getProductDetailSuccess: (state, action: PayloadAction<IProduct>) => {
      state.productDetail = action.payload
    },
    updateProductDetail: (state, _action: PayloadAction<IProduct>) => {
      state.isLoading = true
    },
    updateProductDetailSuccess: (state, action: PayloadAction<IProduct>) => {
      state.productDetail = action.payload
      state.isLoading = false
    }
  }
})

export const {
  requestProductDetailFailure,
  getProductDetailSuccess,
  getProductDetail,
  updateProductDetail,
  updateProductDetailSuccess
} = productDetailSlices.actions

export default productDetailSlices.reducer
