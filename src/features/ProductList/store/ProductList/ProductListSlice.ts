/* eslint-disable @typescript-eslint/no-unused-vars */
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ICategory, IProduct, IResponseCategoryList, IResponseProductList } from '../../type/IProduct'

export interface IProductPagination {
  pageSize?: number
  current?: number
  total?: number
}
export interface IInitState {
  productList: IProduct[]
  categoryList: ICategory[]
  isLoading: boolean
  productListPagination: {
    pageSize: number
    current: number
    total: number
  }
}
export interface IActionGetListProduct {
  current: number
  page: number
  pageSize: number
  keySearchProduct?: string
  keySearchCategory?: string
}

const initialState: IInitState = {
  productList: [],
  categoryList: [],
  isLoading: false,
  productListPagination: { pageSize: 10, current: 1, total: 0 }
}

export const productListSlices = createSlice({
  name: 'product',
  initialState: initialState,
  reducers: {
    updateProductListState: (state, action: PayloadAction<IProduct[]>) => {
      state.productList = action.payload
    },
    updateDetailProductInList: (state, action: PayloadAction<IProduct>) => {
      state.productList = state.productList.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload
        }
        return item
      })
    },
    updateProductListPagination: (state, action: PayloadAction<IProductPagination>) => {
      state.productListPagination = {
        ...state.productListPagination,
        ...action.payload
      }
    },
    getProductList: (state, _action: PayloadAction<IActionGetListProduct>) => {
      state.isLoading = true
    },
    requestProductListFailure: (state) => {
      state.isLoading = false
    },
    getProductListSuccess: (state, action: PayloadAction<IResponseProductList>) => {
      state.productList = action.payload.list.map((item) => ({ ...item, isEditing: false }))
      state.productListPagination = {
        ...state.productListPagination,
        total: action.payload.totalCount
      }
      state.isLoading = false
    },
    getListCategory: (state, _action: PayloadAction<IActionGetListProduct>) => {
      state.isLoading = true
    },
    getListCategorySuccess: (state, action: PayloadAction<IResponseCategoryList>) => {
      state.categoryList = action.payload.list.map((item) => ({ ...item, value: item.category }))
      state.isLoading = false
    }
  }
})

export const {
  updateProductListState,
  getProductList,
  updateDetailProductInList,
  getProductListSuccess,
  requestProductListFailure,
  updateProductListPagination,
  getListCategory,
  getListCategorySuccess
} = productListSlices.actions

export default productListSlices.reducer
