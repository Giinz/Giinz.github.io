import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeEvery } from 'redux-saga/effects'
import productsApi from '../../api/productsApi'
import { IProduct } from '../../type/IProduct'
import {
  getProductDetail,
  getProductDetailSuccess,
  requestProductDetailFailure,
  updateProductDetail
} from '../ProductDetail/ProductDetailSlices'

export function* productDetailSaga() {
  try {
    yield takeEvery(getProductDetail, fetchProductDetail)
    yield takeEvery(updateProductDetail, putProductDetail)
  } catch (error) {
    yield put(requestProductDetailFailure())
  }
}

function* fetchProductDetail(action: PayloadAction<IProduct>) {
  try {
    const { id } = action.payload
    const productDetail: IProduct = yield call(productsApi.getProductDetail, id)
    yield put(getProductDetailSuccess(productDetail))
  } catch (error) {
    yield put(requestProductDetailFailure())
  }
}

function* putProductDetail(action: PayloadAction<IProduct>) {
  try {
    const productDetail: IProduct = yield call(productsApi.updateProductDetail, action.payload)
    yield put(getProductDetailSuccess(productDetail))
  } catch (error) {
    yield put(requestProductDetailFailure())
  }
}
