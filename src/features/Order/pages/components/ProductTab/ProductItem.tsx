import { renderPrice } from '@/features/Order/Utils/renderPrice'
import { addOrderToList } from '@/features/Order/orderSlice'
import { IOrder } from '@/features/Order/types/IOrder'
import { updateDetailProductInList } from '@/features/ProductList/store/ProductList/ProductListSlice'
import { IProduct } from '@/features/ProductList/types/IProduct'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { CheckCircleOutlined } from '@ant-design/icons'
import { Button, Col, Row, Typography } from 'antd'

const ProductItem = ({ item }: { item: IProduct }) => {
  const { priceType } = useAppSelector((state) => state.order)
  const dispatch = useAppDispatch()
  return (
    <Row justify={'space-between'} style={{ width: '100%' }} align={'middle'}>
      <Col span={10}>
        <Typography.Title level={4}>{item.name}</Typography.Title>
      </Col>
      <Col span={5}>
        <Row justify={'center'} align={'middle'}>
          <Typography.Title level={5}>{item.category}</Typography.Title>
        </Row>
      </Col>
      <Col span={5}>
        <Typography.Title level={4}>{renderPrice(priceType, item).toLocaleString('vi-VN')}</Typography.Title>
      </Col>
      <Col span={4}>
        <Row justify={'center'} align={'middle'}>
          {item.isSelected ? (
            <CheckCircleOutlined
              style={{
                fontSize: '20px',
                cursor: 'pointer',
                color: 'rgb(68, 211, 32)'
              }}
            />
          ) : (
            <Button
              type='primary'
              onClick={() => {
                const orderItem: IOrder = {
                  ...item,
                  quantity: 1,
                  discount: 0,
                  total: item.price1,
                  isEditing: false
                }
                dispatch(addOrderToList(orderItem))
                dispatch(updateDetailProductInList({ ...item, isSelected: true }))
              }}
            >
              Lựa chọn
            </Button>
          )}
        </Row>
      </Col>
    </Row>
  )
}

export default ProductItem
