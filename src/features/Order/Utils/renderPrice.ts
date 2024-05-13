import { IProduct } from '@/features/ProductList/types/IProduct'
import { IOrder } from '../types/IOrder'

export const renderPrice = (priceType: number, record: IOrder | IProduct): number => {
  if (priceType === 1) {
    return record.price1
  } else if (priceType === 2) {
    return record.price2
  } else if (priceType === 3) {
    return record.price3
  }
  return 0
}
