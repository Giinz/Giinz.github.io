import CustomTable from '@/Components/CustomTable/CustomTable'
import { renderPrice } from '@/features/Order/Utils/renderPrice'
import {
  deleteEntireOrder,
  deleteOrderItem,
  updateCurrentOrder,
  updateOrderDiscount,
  updateOrderPriceType
} from '@/features/Order/orderSlice'
import { IOrder } from '@/features/Order/types/IOrder'
import EditableCell from '@/features/ProductList/pages/components/EditableCell'
import {
  updateDetailProductInList,
  updateProductListState
} from '@/features/ProductList/store/ProductList/ProductListSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { DeleteOutlined } from '@ant-design/icons'
import { Button, Col, Flex, Form, InputNumber, Row, Select, Tooltip, Typography } from 'antd'
import { useState } from 'react'
import TotalTag from '../TotalTag/TotalTag'

const OrderTab = () => {
  const { orderList, priceType } = useAppSelector((state) => state.order)
  const { productList } = useAppSelector((state) => state.product.productList)
  const dispatch = useAppDispatch()
  const [form] = Form.useForm()
  const [discount, setDiscount] = useState<number>(0)

  const handleDeleteOrderItem = (record: IOrder) => {
    dispatch(updateDetailProductInList({ ...record, isSelected: false }))
    dispatch(deleteOrderItem(record))
  }

  const columns = [
    {
      title: 'Tên hàng',
      dataIndex: 'name',
      key: 'name'
    },
    { title: 'Nhóm hàng', dataIndex: 'category', key: 'category' },
    {
      title: 'Đơn Giá',
      key: 'price',
      render: (_: unknown, record: IOrder) => {
        return renderPrice(priceType, record)?.toLocaleString('vi-VN')
      }
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      editable: true,
      className: 'editableCell'
    },
    {
      title: 'Chiết khấu',
      key: 'discount',
      render: () => {
        return discount + '%'
      }
    },
    {
      title: 'Thành tiền',
      dataIndex: 'total',
      key: 'total',
      render: (_: unknown, record: IOrder) => {
        const totalRowPrice =
          renderPrice(priceType, record) * record.quantity -
          (renderPrice(priceType, record) * record.quantity * discount) / 100
        return totalRowPrice.toLocaleString('vi-VN')
      }
    },
    {
      title: 'Thao tác',
      dataIndex: 'operation',
      align: 'center',
      render: (_: unknown, record: IOrder) => {
        return (
          <Tooltip title='Xóa sản phẩm'>
            <DeleteOutlined
              style={{
                fontSize: '20px',
                cursor: 'pointer',
                color: 'rgb(255, 0, 0)'
              }}
              onClick={() => handleDeleteOrderItem(record)}
            />
          </Tooltip>
        )
      }
    }
  ]
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: (record: IOrder) => ({
        record,
        title: col.title,
        inputType: col.dataIndex === 'quantity' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        editing: record.isEditing,
        onClick: () => {
          form.setFieldValue(`quantity_${record.id}`, record.quantity)
          dispatch(updateCurrentOrder({ ...record, isEditing: true }))
        },
        toggleEdit: () => {
          const quanlityChanged = form.getFieldValue(`quantity_${record.id}`)
          dispatch(
            updateCurrentOrder({
              ...record,
              quantity: quanlityChanged,
              isEditing: false,
              total: renderPrice(priceType, record) * quanlityChanged
            })
          )
        }
      })
    }
  })

  return (
    <Form form={form}>
      <Col span={24}>
        <Row justify={'space-between'} style={{ marginBottom: '10px', width: '100%' }}>
          <Col span={6}>
            <Typography.Title level={3}>Đơn hàng</Typography.Title>
          </Col>
          <Col span={18}>
            <Row style={{ width: '100%' }} justify={'space-between'}>
              <Col span={8}>
                <Flex vertical align='center'>
                  <Typography.Text strong style={{ marginRight: '10px' }}>
                    Đại lý
                  </Typography.Text>
                  <Select
                    defaultValue={1}
                    onChange={(value) => {
                      dispatch(updateOrderPriceType(value))
                    }}
                    options={[
                      {
                        value: 1,
                        label: 'Đại lý 1'
                      },
                      {
                        value: 2,
                        label: 'Đại lý 2'
                      },
                      {
                        value: 3,
                        label: 'Bán lẻ'
                      }
                    ]}
                    style={{ width: 120 }}
                  />
                </Flex>
              </Col>
              <Col span={8}>
                <Flex align={'center'} vertical>
                  <Typography.Text strong style={{ marginRight: '10px' }}>
                    Chiết khấu
                  </Typography.Text>
                  <InputNumber
                    value={discount}
                    onChange={(e: number | null) => {
                      dispatch(updateOrderDiscount(e ?? 0))
                      setDiscount(e ?? 0)
                    }}
                    defaultValue={0}
                    type='number'
                    controls={false}
                    suffix={'%'}
                    style={{ width: 60 }}
                  />
                </Flex>
              </Col>
              <Col span={6}>
                <Flex vertical align='center' justify='center' style={{ height: '100%', width: '100%' }}>
                  <Button
                    type='primary'
                    style={{ background: 'red', width: '100%' }}
                    size='middle'
                    onClick={() => {
                      const newProductList = productList.map((item) => ({ ...item, isSelected: false }))
                      dispatch(updateProductListState(newProductList))
                      dispatch(deleteEntireOrder())
                    }}
                  >
                    Xóa đơn hàng
                  </Button>
                </Flex>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
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
        dataSource={orderList}
        rowKey='id'
      />
      {/* <Table dataSource={orderList} columns={columns} bordered pagination={false} /> */}
      <TotalTag />
    </Form>
  )
}

export default OrderTab
