import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  ProductOutlined,
  SettingOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons'
import { Button, Flex, Layout, Menu, MenuProps } from 'antd'
import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
type MenuItem = Required<MenuProps>['items'][number]
const { Header, Footer, Sider, Content } = Layout

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem
}

const items: MenuItem[] = [
  getItem('Đơn hàng', 'order', <ShoppingCartOutlined />),
  getItem('Sản phẩm', 'productList', <ProductOutlined />),
  getItem('Thống kê', '3', <PieChartOutlined />),
  getItem('Cài đặt', '4', <SettingOutlined />)
]

const RootLayout = () => {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const handleSelectMenuItem = ({ key }: { key: string }) => {
    navigate(key)
  }

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }
  return (
    <Layout style={{ overflow: 'hidden', width: '100%', maxWidth: '100%', height: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Flex vertical justify='center'>
          <Button type='primary' onClick={toggleCollapsed} style={{ margin: '16px 5px' }}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
          <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode='inline'
            theme='dark'
            items={items}
            onSelect={handleSelectMenuItem}
          />
        </Flex>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', fontWeight: 'bold', fontSize: '32px' }}>
          Đại lý nhựa Song Long - Long Biên
        </Header>
        <Content>
          <Outlet />
        </Content>
        <Footer style={{ background: '#fff' }}>Footer</Footer>
      </Layout>
    </Layout>
  )
}

export default RootLayout
