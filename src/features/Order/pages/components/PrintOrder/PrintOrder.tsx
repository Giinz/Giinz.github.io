import CustomTable from '@/Components/CustomTable/CustomTable'
import EditableCell from '@/features/ProductList/pages/components/EditableCell'
import { useAppSelector } from '@/store/hooks'
import { Col, Flex, Layout, Row, Typography } from 'antd'
import { forwardRef } from 'react'
import styles from '../TotalTag/TotalTagStyle.module.scss'

interface Props {
  mergedColumns: any
}
const PrintOrder = forwardRef<HTMLElement, Props>(({ mergedColumns }, ref) => {
  const { orderList, totalPrice, discount, priceType } = useAppSelector((state) => state.order)

  return (
    <Layout ref={ref} style={{ height: '100%' }}>
      <Col span={24}>
        <Row>
          <Col span={12}>
            <Typography.Title level={3}>Đại lý nhựa Song Long - Dũng Hà</Typography.Title>
            <Typography.Title level={5}>Địa chỉ: 428 Ngọc Lâm, Long Biên, Hà Nội</Typography.Title>
            <Typography.Title level={5}>ĐT: 04-38730787 DĐ: 0912.929.766</Typography.Title>
          </Col>
          <Col span={12}>
            <Flex vertical align='center'>
              <Typography.Title level={3}>Phiếu xuất kho</Typography.Title>
              <Typography.Title level={5}>Chuyên bán buôn, bán lẻ nhựa gia dụng</Typography.Title>
            </Flex>
          </Col>
        </Row>
        <Row justify={'end'}>
          <Col span={5}>
            <Typography.Title level={5}>Đại lý: {priceType}</Typography.Title>
          </Col>
          <Col span={5}>
            <Typography.Title level={5}>Chiết khấu: {discount} %</Typography.Title>
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
      </Col>
    </Layout>
  )
})

export default PrintOrder
