import { useAppSelector } from '@/store/hooks'
import { SearchOutlined } from '@ant-design/icons'
import { AutoComplete, Button, Col, Flex, Input, Row, Typography } from 'antd'
import React, { ChangeEvent } from 'react'

type Props = {
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void
  setKeySearchCategory: React.Dispatch<React.SetStateAction<string>>
  setIsAddingProduct: React.Dispatch<React.SetStateAction<boolean>>
}

const SearchInput = ({ handleSearch, setKeySearchCategory, setIsAddingProduct }: Props) => {
  const { categoryList } = useAppSelector((state) => state.product.productList)
  return (
    <Row style={{ padding: '10px 20px', margin: 0 }} justify={'space-between'} gutter={16}>
      <Col span={10}>
        <Typography.Title level={5}>Tìm kiếm sản phẩm</Typography.Title>
        <Input placeholder='Tìm kiếm sản phẩm' prefix={<SearchOutlined />} onChange={handleSearch} />
      </Col>
      <Col span={10}>
        <Typography.Title level={5}>Tìm kiếm nhóm hàng</Typography.Title>
        <AutoComplete
          options={categoryList}
          style={{ width: '100%' }}
          filterOption={(inputValue, option) =>
            option?.value ? option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1 : false
          }
          onSelect={(value) => {
            setKeySearchCategory(value)
          }}
          allowClear
          onClear={() => {
            setKeySearchCategory('')
          }}
          placeholder='Tìm kiếm nhóm hàng'
        />
      </Col>
      <Col span={4}>
        <Flex justify='center' align='center' style={{ height: '100%' }}>
          <Button type='primary' onClick={() => setIsAddingProduct(true)}>
            Thêm mới
          </Button>
        </Flex>
      </Col>
    </Row>
  )
}

export default SearchInput
