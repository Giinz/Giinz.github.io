import axiosClient from '@/api/axiosClient'
import { IProduct } from '@/features/ProductList/types/IProduct'
import { ListParams } from '@/types/common'

const productsApi = {
  getList(params: ListParams): Promise<IProduct[]> {
    return axiosClient.post('products/getList', params)
  },
  getProductDetail(id: string): Promise<IProduct> {
    return axiosClient.get(`products/${id}`)
  },
  updateProductDetail(product: IProduct): Promise<IProduct> {
    return axiosClient.put(`products/${product.id}`, product)
  },
  getListCategory(params: ListParams): Promise<IProduct[]> {
    return axiosClient.post('products/GetListCategory', params)
  },
  createProduct(product: IProduct): Promise<IProduct> {
    return axiosClient.post('products/createProduct', product)
  },
  deleteProduct(id: string): Promise<IProduct> {
    return axiosClient.delete(`products/${id}`)
  }
}

export default productsApi
