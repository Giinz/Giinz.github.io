import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeLatest } from 'redux-saga/effects'
import productsApi from '../../api/productsApi'
import { IResponseCategoryList, IResponseProductList } from '../../types/IProduct'
import {
  IActionGetListProduct,
  getListCategory,
  getListCategorySuccess,
  getProductList,
  getProductListSuccess,
  requestProductListFailure
} from './ProductListSlice'

export function* productListSaga() {
  try {
    yield takeLatest(getProductList, fetchProductList)
    yield takeLatest(getListCategory, fetchCategoryList)
  } catch (error) {
    yield put(requestProductListFailure())
  }
}

function* fetchProductList(action: PayloadAction<IActionGetListProduct>) {
  try {
    const { page, current, pageSize, keySearchCategory, keySearchProduct } = action.payload
    const productList: IResponseProductList = yield call(productsApi.getList, {
      page: page,
      current: current,
      pageSize: pageSize,
      keySearchCategory,
      keySearchProduct
    })

    yield put(getProductListSuccess(productList))
  } catch (error) {
    yield put(requestProductListFailure())
  }
}
function* fetchCategoryList(action: PayloadAction<IActionGetListProduct>) {
  try {
    const { page, current, pageSize, keySearchCategory } = action.payload
    const listCategory: IResponseCategoryList = yield call(productsApi.getListCategory, {
      page: page,
      current: current,
      pageSize: pageSize,
      keySearchCategory
    })

    yield put(getListCategorySuccess(listCategory))
  } catch (error) {
    yield put(requestProductListFailure())
  }
}
