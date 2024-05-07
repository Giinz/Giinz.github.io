import App from '@/App'
import Order from '@/features/Order/pages/Order'
import ProductList from '@/features/ProductList/pages/ProductList'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'productList',
        element: <ProductList />
      },
      {
        path: 'order',
        element: <Order />
      }
    ]
  }
])
export default router
