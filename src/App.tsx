import { ConfigProvider } from 'antd'
import RootLayout from './Layout/RootLayout/RootLayout'

function App() {
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
