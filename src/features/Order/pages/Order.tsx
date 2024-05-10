// type Props = {}

import { Col, Row } from 'antd'
import OrderTab from './components/OrderTab/OrderTab'
import ProductTab from './components/ProductTab/ProductTab'

const Order = () => {
  return (
    <Row style={{ height: '100%', padding: '10px' }}>
      <Col span={12}>
        <OrderTab />
      </Col>
      <Col span={12}>
        <ProductTab />
      </Col>
    </Row>
  )
}

export default Order
