import CustomTable from '@/Components/CustomTable/CustomTable'
import { renderPrice } from '@/features/Order/Utils/renderPrice'
import { IOrder } from '@/features/Order/types/IOrder'
import { useAppSelector } from '@/store/hooks'
import { Col, Flex, Row, Typography } from 'antd'
import { forwardRef } from 'react'
import styles from '../TotalTag/TotalTagStyle.module.scss'

interface Props {}
const PrintOrder = forwardRef<HTMLElement, Props>((_props, ref) => {
  const { orderList, totalPrice, discount, priceType } = useAppSelector((state) => state.order)
  const newColumn = [
    {
      title: 'Tên hàng',
      width: '30%',
      dataIndex: 'name',
      key: 'name'
    },
    { title: 'Nhóm hàng', dataIndex: 'category', key: 'category', width: '10%' },
    {
      title: 'Đơn Giá',
      width: '20%',
      key: 'price',
      render: (_: unknown, record: IOrder) => {
        return renderPrice(priceType, record)?.toLocaleString('vi-VN')
      }
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      width: '10%',
      editable: true,
      className: 'editableCell'
    },
    {
      title: 'Chiết khấu',
      key: 'discount',
      align: 'center',
      width: '10%',
      render: () => {
        return discount + '%'
      }
    },
    {
      title: 'Thành tiền',
      dataIndex: 'total',
      width: '30%',
      key: 'total',
      render: (_: unknown, record: IOrder) => {
        const totalRowPrice =
          renderPrice(priceType, record) * record.quantity -
          (renderPrice(priceType, record) * record.quantity * discount) / 100
        return totalRowPrice.toLocaleString('vi-VN')
      }
    }
  ]
  return (
    <main
      ref={ref}
      style={{ height: '100%', padding: '20px', width: '100%', position: 'absolute', zIndex: '-10000' }}
      id='printOrder'
    >
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
      <CustomTable style={{ width: '100%' }} columns={newColumn} dataSource={orderList} />
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
    </main>
  )
})

export default PrintOrder
