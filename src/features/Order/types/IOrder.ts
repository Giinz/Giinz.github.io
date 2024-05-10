import { IProduct } from '@/features/ProductList/types/IProduct'

export interface IOrder extends IProduct {
  quantity: number
  discount: number
  total: number
  isEditing: boolean
}
export interface IInitStateOrder {
  orderList: IOrder[]
  isLoading: boolean
  errorMessage?: string
}
