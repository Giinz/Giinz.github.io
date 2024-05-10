import { useAppSelector } from '@/store/hooks'
import { SearchOutlined } from '@ant-design/icons'
import { AutoComplete, Col, Input, Typography } from 'antd'
import React, { ChangeEvent } from 'react'

type Props = {
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void
  setKeySearchCategory: React.Dispatch<React.SetStateAction<string>>
}

const SearchInput = ({ handleSearch, setKeySearchCategory }: Props) => {
  const { categoryList } = useAppSelector((state) => state.product.productList)
  return (
    <>
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
    </>
  )
}

export default SearchInput
