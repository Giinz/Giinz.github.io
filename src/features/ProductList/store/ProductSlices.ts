import { combineSlices } from '@reduxjs/toolkit'
import { productDetailSlices } from './ProductDetail/ProductDetailSlices'
import { productListSlices } from './ProductList/ProductListSlice'

const rootProductReducer = combineSlices(productListSlices, productDetailSlices, {
  productList: productListSlices.reducer,
  productDetail: productDetailSlices.reducer
})

export default rootProductReducer
