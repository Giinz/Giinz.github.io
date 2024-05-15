import { ConfigProvider } from 'antd'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import RootLayout from './Layout/RootLayout/RootLayout'
import { getListCategory } from './features/ProductList/store/ProductList/ProductListSlice'
import { useAppDispatch } from './store/hooks'

function App() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    navigate('order')
  }, [navigate])

  useEffect(() => {
    dispatch(
      getListCategory({
        page: 1,
        pageSize: 1000,
        current: 1000
      })
    )
  }, [dispatch])
  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            headerColor: 'blue'
          }
        }
      }}
    >
      <RootLayout />
    </ConfigProvider>
  )
}

export default App
