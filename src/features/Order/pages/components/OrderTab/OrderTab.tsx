import CustomTable from '@/Components/CustomTable/CustomTable'
import { updateCurrentOrder } from '@/features/Order/orderSlice'
import { IOrder } from '@/features/Order/types/IOrder'
import EditableCell from '@/features/ProductList/pages/components/EditableCell'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { Col, Form, InputNumber, Row, Select, Typography } from 'antd'
import { useState } from 'react'

const OrderTab = () => {
  const { orderList } = useAppSelector((state) => state.order)
  const dispatch = useAppDispatch()
  const [form] = Form.useForm()
  const [priceType, setPriceType] = useState<number>(1)
  const [discount, setDiscount] = useState<number>(0)
  const renderPrice = (record: IOrder): number => {
    if (priceType === 1) {
      return record.price1
    } else if (priceType === 2) {
      return record.price2
    } else if (priceType === 3) {
      return record.price3
    }
    return 0
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
        return renderPrice(record)?.toLocaleString('vi-VN')
      }
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      editable: true
      // render: (_: unknown, record: IOrder) => {
      //   if (record.isEditing) {
      //     form.setFieldValue(`quantity_${record.id}`, record.quantity)
      //     return (
      //       <Input
      //         type='number'
      //         defaultValue={record.quantity}
      //         onChange={() => {
      //           console.log('e')
      //         }}
      //       />
      //     )
      //   } else {
      //     return (
      //       <Typography.Text
      //         onClick={() => {
      //           dispatch(updateCurrentOrder({ ...record, isEditing: true }))
      //         }}
      //       >
      //         {record.quantity}
      //       </Typography.Text>
      //     )
      //   }
      // }
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
        return (renderPrice(record) * record.quantity).toLocaleString('vi-VN')
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
        editing: record.isEditing
      })
    }
  })

  return (
    <Form form={form}>
      <Row justify={'space-between'} style={{ marginBottom: '10px' }}>
        <Typography.Title level={3}>Đơn hàng</Typography.Title>
        <Col span={10}>
          <Row justify={'space-around'}>
            <Col span={12}>
              <Row align={'middle'} justify={'center'}>
                <Typography.Text strong style={{ marginRight: '10px' }}>
                  Đại lý
                </Typography.Text>
                <Select
                  defaultValue={1}
                  onChange={(value) => setPriceType(value)}
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
              </Row>
            </Col>
            <Col span={12}>
              <Row align={'middle'} justify={'center'}>
                <Typography.Text strong style={{ marginRight: '10px' }}>
                  Chiết khấu
                </Typography.Text>
                <InputNumber
                  value={discount}
                  onChange={(e: number | null) => {
                    e ? setDiscount(e) : setDiscount(0)
                  }}
                  defaultValue={0}
                  type='number'
                  controls={false}
                  suffix={'%'}
                  style={{ width: 60 }}
                />
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
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
        onRow={(record: IOrder) => ({
          onClick: () => {
            form.setFieldValue(`quantity_${record.id}`, record.quantity)
            dispatch(updateCurrentOrder({ ...record, isEditing: true }))
          },
          onBlur: () => {
            const quanlityChanged = form.getFieldValue(`quantity_${record.id}`)
            dispatch(updateCurrentOrder({ ...record, quantity: quanlityChanged, isEditing: false }))
          }
        })}
        columns={mergedColumns}
        dataSource={orderList}
        rowKey='id'
      />
      {/* <Table dataSource={orderList} columns={columns} bordered pagination={false} /> */}
    </Form>
  )
}

export default OrderTab
