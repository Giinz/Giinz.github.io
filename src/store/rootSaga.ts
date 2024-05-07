import { productDetailSaga } from '@/features/ProductList/store/ProductDetail/ProductDetailSaga'
import { productListSaga } from '@/features/ProductList/store/ProductList/ProductSaga'
import { all } from 'redux-saga/effects'
export default function* rootSaga() {
  yield all([productListSaga(), productDetailSaga()])
}
