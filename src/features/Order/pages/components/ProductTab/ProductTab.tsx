import SearchInput from '@/features/ProductList/pages/components/SearchInput'
import { getProductList, updateProductListPagination } from '@/features/ProductList/store/ProductList/ProductListSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { Col, Divider, List, Row, Skeleton } from 'antd'
import { debounce } from 'lodash'
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import ProductItem from './ProductItem'

const ProductTab: React.FC = () => {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)
  const [keySearchProduct, setKeySearchProduct] = useState<string>('')
  const [keySearchCategory, setKeySearchCategory] = useState<string>('')

  const { productList, productListPagination } = useAppSelector((state) => state.product.productList)
  const handleSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setKeySearchProduct(e.target.value)
    dispatch(updateProductListPagination({ current: 1, pageSize: 10 }))
  }, 500)
  const loadMoreData = () => {
    if (loading) {
      return
    }
    setLoading(true)
    dispatch(
      updateProductListPagination({
        current: productListPagination.current,
        pageSize: productListPagination.pageSize + 20
      })
    )
    // setData([...data, ...productList])
    setLoading(false)
  }
  // useEffect(() => {
  //   dispatch(
  //     updateProductListPagination({
  //       current: 1,
  //       pageSize: 20
  //     })
  //   )
  // }, [])

  useEffect(() => {
    dispatch(
      getProductList({
        page: productListPagination.current,
        pageSize: productListPagination.pageSize,
        current: productListPagination.current,
        keySearchProduct,
        keySearchCategory
      })
    )

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dispatch,
    productListPagination.pageSize,
    productListPagination.total,
    productListPagination.current,
    keySearchProduct,
    keySearchCategory
  ])

  return (
    <Col>
      <Row style={{ width: '100%' }} justify={'space-around'}>
        <SearchInput handleSearch={handleSearch} setKeySearchCategory={setKeySearchCategory} />
      </Row>
      <div
        id='scrollableDiv'
        style={{
          height: 'calc(100vh - 84px - 54px)',
          overflow: 'auto',
          padding: '0 16px',
          borderRadius: '10px',
          margin: '5px',
          border: '1px solid rgba(140, 140, 140, 0.35)',
          backgroundColor: '#fff'
        }}
      >
        <InfiniteScroll
          dataLength={productList.length}
          next={loadMoreData}
          hasMore={productList.length < productListPagination.total}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget='scrollableDiv'
        >
          <List
            dataSource={productList}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <ProductItem item={item} />
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    </Col>
  )
}

export default ProductTab
