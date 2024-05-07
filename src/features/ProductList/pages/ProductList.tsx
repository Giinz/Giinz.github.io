import CustomTable from '@/Components/CustomTable/CustomTable'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { CheckCircleOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import { AutoComplete, Button, Col, Flex, Form, Input, Row, Tooltip, Typography } from 'antd'
import { debounce } from 'lodash'
import React, { useEffect, useState } from 'react'
import { updateProductDetail } from '../store/ProductDetail/ProductDetailSlices'
import {
  IProductPagination,
  getListCategory,
  getProductList,
  updateProductListPagination,
  updateProductListState
} from '../store/ProductList/ProductListSlice'
import { IProduct } from '../type/IProduct'
import EditableCell from './components/EditableCell'

export interface columnsType {
  title?: string
  dataIndex?: string
  key?: string
  render?: (a: string | boolean | number, b: string | number | boolean, c: number) => JSX.Element
}
const ProductList = () => {
  const dispatch = useAppDispatch()
  const { productList, productListPagination, isLoading, categoryList } = useAppSelector(
    (state) => state.product.productList
  )
  const [keySearchProduct, setKeySearchProduct] = useState<string>('')
  const [keySearchCategory, setKeySearchCategory] = useState<string>('')
  const [form] = Form.useForm()

  const handleSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setKeySearchProduct(e.target.value)
    dispatch(updateProductListPagination({ current: 1, pageSize: 10 }))
  }, 500)
  const renderPriceColumn = (price: number) => {
    return <span>{price?.toLocaleString('vi-VN')}</span>
  }
  const column = [
    {
      title: 'STT',
      width: '10%',
      fixed: 'left',
      align: 'center',
      render: (_: string, __: string, index: number) => (
        <span>{1 + index + productListPagination.pageSize * (productListPagination.current - 1)}</span>
      )
    },
    {
      title: 'Tên hàng',
      dataIndex: 'name',
      width: '20%',
      key: 'name'
    },
    {
      title: 'Nhóm hàng',
      dataIndex: 'category',
      width: '15%',
      key: 'category'
    },
    {
      title: 'Đại lý 1',
      dataIndex: 'price1',
      width: '15%',
      key: 'price1',
      editable: true,
      render: renderPriceColumn
    },
    {
      title: 'Đại lý 2',
      width: '15%',
      dataIndex: 'price2',
      key: 'price2',
      editable: true,
      render: renderPriceColumn
    },
    {
      title: 'Bán lẻ',
      width: '15%',
      dataIndex: 'price3',
      key: 'price3',
      editable: true,
      render: renderPriceColumn
    },
    {
      title: 'Thao tác',
      dataIndex: 'action',
      width: '10%',
      fixed: 'right',
      align: 'center',
      render: (_: unknown, record: IProduct) =>
        record.isEditing ? (
          <Tooltip title='Lưu'>
            <CheckCircleOutlined
              onClick={() => {
                const formValue = form.getFieldsValue()
                const newProductList = productList.map((item) => {
                  if (item.id === record.id) {
                    return {
                      ...item,
                      ...formValue,
                      isEditing: !item.isEditing
                    }
                  } else {
                    return item
                  }
                })
                dispatch(updateProductListState(newProductList))
                dispatch(updateProductDetail({ ...record, ...formValue }))
              }}
              style={{
                fontSize: '20px',
                cursor: 'pointer',
                color: 'rgb(68, 211, 32)'
              }}
            />
          </Tooltip>
        ) : (
          <Tooltip title='Cập nhật'>
            <EditOutlined
              onClick={() => {
                const newProductList = productList.map((item) => {
                  if (item.id === record.id) {
                    return {
                      ...item,
                      isEditing: !item.isEditing
                    }
                  } else {
                    return item
                  }
                })
                dispatch(updateProductListState(newProductList))
                form.setFieldsValue({ price1: record.price1, price2: record.price2, price3: record.price3 })
              }}
              style={{
                fontSize: '20px',
                cursor: 'pointer',
                color: 'rgb(73, 121, 209)'
              }}
            />
          </Tooltip>
        )
    }
  ]
  const mergedColumns = column.map((col) => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: (record: IProduct) => ({
        record,
        dataIndex: col.dataIndex,
        editing: record.isEditing
      })
    }
  })
  const handleTableChange = (Pagination: IProductPagination) => {
    if (productListPagination.pageSize !== Pagination.pageSize) {
      dispatch(
        updateProductListPagination({
          pageSize: Pagination.pageSize
        })
      )
    }

    if (productListPagination.current !== Pagination.current) {
      dispatch(
        updateProductListPagination({
          current: Pagination.current
        })
      )
    }
  }

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

  useEffect(() => {
    dispatch(
      getListCategory({
        page: 1,
        pageSize: 1000,
        current: 1000
      })
    )
  }, [dispatch])

  return (
    <Form form={form} component={false}>
      <Col span={24} style={{ height: '100%', overflow: 'scroll' }}>
        <Row style={{ padding: '10px 20px' }} justify={'space-between'} gutter={16}>
          <Col span={10}>
            <Typography.Title level={5}>Tìm kiếm sản phẩm</Typography.Title>
            <Input placeholder='Tìm kiếm sản phẩm' prefix={<SearchOutlined />} onChange={handleSearch} />
          </Col>
          <Col span={10}>
            <Typography.Title level={5}>Tìm kiếm nhóm hàng</Typography.Title>
            <AutoComplete
              options={categoryList}
              style={{ width: '100%' }}
              filterOption={(inputValue, option) =>
                option?.value ? option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1 : false
              }
              onSelect={(value) => {
                setKeySearchCategory(value)
              }}
              allowClear
              onClear={() => {
                setKeySearchCategory('')
              }}
              placeholder='Tìm kiếm nhóm hàng'
            />
          </Col>
          <Col span={4}>
            <Flex justify='center' align='center' style={{ height: '100%' }}>
              <Button type='primary'>Thêm mới</Button>
            </Flex>
          </Col>
        </Row>
        <CustomTable
          style={{ height: '100%', width: '100%' }}
          components={{
            body: {
              cell: EditableCell
            }
          }}
          columns={mergedColumns}
          dataSource={productList}
          rowKey='id'
          onChange={handleTableChange}
          loading={isLoading}
          pagination={{
            current: productListPagination.current,
            pageSize: productListPagination.pageSize,
            total: productListPagination.total,
            defaultPageSize: 10
          }}
        />
      </Col>
    </Form>
  )
}

export default ProductList
