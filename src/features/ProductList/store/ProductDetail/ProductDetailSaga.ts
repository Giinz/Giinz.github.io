import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeEvery } from 'redux-saga/effects'
import productsApi from '../../api/productsApi'
import { IProduct } from '../../type/IProduct'
import {
  createProduct,
  createProductSuccess,
  deleteProduct,
  deleteProductSuccess,
  getProductDetail,
  getProductDetailSuccess,
  requestProductDetailFailure,
  updateProductDetail
} from '../ProductDetail/ProductDetailSlices'

export function* productDetailSaga() {
  try {
    yield takeEvery(getProductDetail, fetchProductDetail)
    yield takeEvery(updateProductDetail, putProductDetail)
    yield takeEvery(createProduct, createNewProduct)
    yield takeEvery(deleteProduct, deleteSingleProduct)
  } catch (error) {
    if (error instanceof Error) {
      yield put(requestProductDetailFailure(error.message))
    }
  }
}

function* fetchProductDetail(action: PayloadAction<IProduct>) {
  try {
    const { id } = action.payload
    const productDetail: IProduct = yield call(productsApi.getProductDetail, id)
    yield put(getProductDetailSuccess(productDetail))
  } catch (error) {
    if (error instanceof Error) {
      yield put(requestProductDetailFailure(error.message))
    }
  }
}

function* putProductDetail(action: PayloadAction<IProduct>) {
  try {
    const productDetail: IProduct = yield call(productsApi.updateProductDetail, action.payload)
    yield put(getProductDetailSuccess(productDetail))
  } catch (error) {
    if (error instanceof Error) {
      yield put(requestProductDetailFailure(error.message))
    }
  }
}
function* createNewProduct(action: PayloadAction<IProduct>) {
  try {
    const productDetail: IProduct = yield call(productsApi.createProduct, action.payload)
    yield put(createProductSuccess(productDetail))
  } catch (error) {
    if (error instanceof Error) {
      yield put(requestProductDetailFailure(error.message))
    }
  }
}

function* deleteSingleProduct(action: PayloadAction<string>) {
  try {
    yield call(productsApi.deleteProduct, action.payload)
    yield put(deleteProductSuccess())
  } catch (error) {
    if (error instanceof Error) {
      yield put(requestProductDetailFailure(error.message))
    }
  }
}
