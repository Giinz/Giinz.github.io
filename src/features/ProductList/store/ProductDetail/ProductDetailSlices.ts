/* eslint-disable @typescript-eslint/no-unused-vars */
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IProduct } from '../../type/IProduct'

export interface IInitState {
  productDetail?: IProduct | null
  isLoading: boolean
  errorMessage?: string
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
    requestProductDetailFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.errorMessage = action.payload
    },

    getProductDetail: (state, _action: PayloadAction<IProduct>) => {
      state.errorMessage = undefined
      state.isLoading = true
    },
    getProductDetailSuccess: (state, action: PayloadAction<IProduct>) => {
      state.productDetail = action.payload
    },
    updateProductDetail: (state, _action: PayloadAction<IProduct>) => {
      state.errorMessage = undefined
      state.isLoading = true
    },
    updateProductDetailSuccess: (state, action: PayloadAction<IProduct>) => {
      state.productDetail = action.payload
      state.isLoading = false
    },
    createProduct: (state, _action: PayloadAction<IProduct>) => {
      state.errorMessage = undefined
      state.isLoading = true
    },
    createProductSuccess: (state, _action: PayloadAction<IProduct>) => {
      state.isLoading = false
    },
    deleteProduct: (state, _action: PayloadAction<string>) => {
      state.errorMessage = undefined
      state.isLoading = true
    },
    deleteProductSuccess: (state) => {
      state.isLoading = false
    }
  }
})

export const {
  requestProductDetailFailure,
  getProductDetailSuccess,
  getProductDetail,
  updateProductDetail,
  updateProductDetailSuccess,
  createProductSuccess,
  createProduct,
  deleteProduct,
  deleteProductSuccess
} = productDetailSlices.actions

export default productDetailSlices.reducer
