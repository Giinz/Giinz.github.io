import { ConfigProvider } from 'antd'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import RootLayout from './Layout/RootLayout/RootLayout'

function App() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('productList')
  }, [navigate])

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
