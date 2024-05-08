import { useAppSelector } from '@/store/hooks'
import { AutoComplete, Col, Form, FormInstance, Input, InputNumber } from 'antd'
import { IProduct } from '../../type/IProduct'

interface FormAddProductProps {
  formCreateProduct: FormInstance<IProduct>
}
const FormAddProduct = ({ formCreateProduct }: FormAddProductProps) => {
  const { categoryList } = useAppSelector((state) => state.product.productList)
  return (
    <Form form={formCreateProduct}>
      <Form.Item name={'name'} rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}>
        <Col span={24}>
          <label>Tên hàng</label>
          <Input placeholder='Tên hàng' />
        </Col>
      </Form.Item>
      <Form.Item name={'category'} rules={[{ required: true, message: 'Vui lòng chọn nhóm hàng' }]}>
        <Col>
          <label>Nhóm hàng</label>
          <AutoComplete
            options={categoryList}
            style={{ width: '100%' }}
            filterOption={(inputValue, option) =>
              option?.value ? option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1 : false
            }
            onSelect={() => {
              formCreateProduct.getFieldsValue
            }}
            allowClear
            placeholder='Chọn nhóm hàng'
          />
        </Col>
      </Form.Item>
      <Form.Item name={'price1'} rules={[{ required: true, message: 'Vui lòng nhập giá đại lý 1' }]}>
        <Col span={24}>
          <label>Đại lý 1</label>
          <InputNumber style={{ width: '100%' }} placeholder='Giá đại lý 1' />
        </Col>
      </Form.Item>
      <Form.Item name={'price2'} rules={[{ required: true, message: 'Vui lòng nhập giá đại lý 2' }]}>
        <Col span={24}>
          <label>Đại lý 2</label>
          <InputNumber style={{ width: '100%' }} placeholder='Giá đại lý 2' />
        </Col>
      </Form.Item>
      <Form.Item name={'price3'} rules={[{ required: true, message: 'Vui lòng nhập giá bán lẻ' }]}>
        <Col span={24}>
          <label>Bán lẻ</label>
          <InputNumber style={{ width: '100%' }} placeholder='Giá bán lẻ' />
        </Col>
      </Form.Item>
    </Form>
  )
}

export default FormAddProduct
