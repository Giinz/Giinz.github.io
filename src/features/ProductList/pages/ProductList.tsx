import CustomTable from '@/Components/CustomTable/CustomTable'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { CheckCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Col, Form, Modal, Row, Tooltip, message } from 'antd'
import { debounce } from 'lodash'
import React, { useEffect, useState } from 'react'
import { createProduct, deleteProduct, updateProductDetail } from '../store/ProductDetail/ProductDetailSlices'
import {
  IProductPagination,
  getListCategory,
  getProductList,
  updateProductListPagination,
  updateProductListState
} from '../store/ProductList/ProductListSlice'
import { IProduct } from '../type/IProduct'
import EditableCell from './components/EditableCell'
import FormAddProduct from './components/FormAddProduct'
import SearchInput from './components/SearchInput'

export interface columnsType {
  title?: string
  dataIndex?: string
  key?: string
  render?: (a: string | boolean | number, b: string | number | boolean, c: number) => JSX.Element
}
const ProductList = () => {
  const dispatch = useAppDispatch()
  const { productList, productListPagination, isLoading } = useAppSelector((state) => state.product.productList)
  const { errorMessage } = useAppSelector((state) => state.product.productDetail)
  const [keySearchProduct, setKeySearchProduct] = useState<string>('')
  const [keySearchCategory, setKeySearchCategory] = useState<string>('')
  const [isAddingProduct, setIsAddingProduct] = useState(false)
  const [form] = Form.useForm()
  const [formCreateProduct] = Form.useForm()

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
      editable: true,
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
      render: (_: unknown, record: IProduct) => (
        <Row justify={'space-evenly'}>
          {record.isEditing ? (
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
                  form.setFieldsValue({
                    name: record.name,
                    price1: record.price1,
                    price2: record.price2,
                    price3: record.price3
                  })
                }}
                style={{
                  fontSize: '20px',
                  cursor: 'pointer',
                  color: 'rgb(73, 121, 209)'
                }}
              />
            </Tooltip>
          )}
          <Tooltip title='Xóa sản phẩm'>
            <DeleteOutlined
              style={{
                fontSize: '20px',
                cursor: 'pointer',
                color: 'rgb(255, 0, 0)'
              }}
              onClick={() => handleDeleteProduct(record)}
            />
          </Tooltip>
        </Row>
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
        inputType: col.dataIndex === 'name' ? 'text' : 'number',
        dataIndex: col.dataIndex,
        editing: record.isEditing
      })
    }
  })

  const handleDeleteProduct = (product: IProduct) => {
    dispatch(deleteProduct(product.id))

    if (errorMessage) {
      return message.error(errorMessage)
    }
    dispatch(
      getProductList({
        page: productListPagination.current,
        pageSize: productListPagination.pageSize,
        current: productListPagination.current,
        keySearchProduct,
        keySearchCategory
      })
    )
    return message.success('Xóa thành công')
  }
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

  const handleCreateProduct = async () => {
    try {
      const newProductValue = await formCreateProduct.validateFields()
      dispatch(createProduct(newProductValue))
      dispatch(
        getProductList({
          page: productListPagination.current,
          pageSize: productListPagination.pageSize,
          current: productListPagination.current,
          keySearchProduct,
          keySearchCategory
        })
      )
      setIsAddingProduct(false)
    } catch (e) {
      console.log(e)
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
    <>
      <Form form={form} component={false}>
        <Col span={24} style={{ height: '100%', overflow: 'scroll' }}>
          {' '}
          <SearchInput
            handleSearch={handleSearch}
            setIsAddingProduct={setIsAddingProduct}
            setKeySearchCategory={setKeySearchCategory}
          />
          <CustomTable
            style={{ width: '100%' }}
            components={{
              body: {
                cell: EditableCell
              }
            }}
            sticky={{
              offsetHeader: 0
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
      <Modal
        open={isAddingProduct}
        title='Thêm sản phẩm'
        onCancel={() => setIsAddingProduct(false)}
        onOk={handleCreateProduct}
      >
        <FormAddProduct formCreateProduct={formCreateProduct} />
      </Modal>
    </>
  )
}

export default ProductList
