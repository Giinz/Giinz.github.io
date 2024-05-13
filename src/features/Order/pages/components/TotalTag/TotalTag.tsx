import { useAppSelector } from '@/store/hooks'
import { Button, Col, Row } from 'antd'
import styles from './TotalTagStyle.module.scss'

const TotalTag = () => {
  const { orderList, totalPrice, discount } = useAppSelector((state) => state.order)
  return (
    <Col span={24} className={styles.priceTag}>
      <Row justify={'space-between'} align={'middle'} className={`${styles.totalPrice} ${styles.priceTagRow}`}>
        <p>Tổng tiền</p>
        <p>{orderList.reduce((total, item) => total + item.total, 0).toLocaleString('vi-VN')}</p>
      </Row>
      <Row justify={'space-between'} align={'middle'} className={`${styles.discount} ${styles.priceTagRow}`}>
        <p>Chiết khấu</p>
        <p>{discount}%</p>
      </Row>
      <Row justify={'space-between'} align={'middle'} className={`${styles.finalPrice} ${styles.priceTagRow}`}>
        <p>Thành tiền</p>
        <p>{((totalPrice * (100 - discount)) / 100).toLocaleString('vi-VN')}</p>
      </Row>
      <Row justify={'end'}>
        <Button size='large' type='primary'>
          In hóa đơn
        </Button>
      </Row>
    </Col>
  )
}

export default TotalTag
