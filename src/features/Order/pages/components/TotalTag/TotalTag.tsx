import { useAppSelector } from '@/store/hooks'
import { PrinterOutlined, SaveOutlined } from '@ant-design/icons'
import { Button, Col, Row } from 'antd'
import styles from './TotalTagStyle.module.scss'

const TotalTag = ({ handlePrint, handleSave }: { handlePrint: () => void; handleSave: () => void }) => {
  const { orderList, totalPrice, discount } = useAppSelector((state) => state.order)
  return (
    <Col span={24} className={styles.priceTag} id='contentToPrint' style={{ width: '100%' }}>
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
        <Button size='large' onClick={handleSave} style={{ marginRight: '15px' }}>
          <SaveOutlined />
          Lưu hóa đơn
        </Button>
        <Button size='large' type='primary' onClick={() => handlePrint()}>
          <PrinterOutlined />
          In hóa đơn
        </Button>
      </Row>
    </Col>
  )
}

export default TotalTag
