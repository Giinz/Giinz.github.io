export interface IProduct {
  id: string
  name: string
  category: string
  type: string
  price1: number
  price2: number
  price3: number
  isEditing: boolean
}
export interface ICategory {
  category: string
  count: number
  value?: string
}
export interface ICommonResponsePagination {
  totalCount: number
  page: number
  pageSize: number
}
export interface IResponseProductList extends ICommonResponsePagination {
  list: IProduct[]
}

export interface IResponseCategoryList extends ICommonResponsePagination {
  list: ICategory[]
}
