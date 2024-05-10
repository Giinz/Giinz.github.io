import App from '@/App'
import Order from '@/features/Order/pages/Order'
import ProductList from '@/features/ProductList/pages/ProductList'
import { createBrowserRouter } from 'react-router-dom'
import ErrorPage from '../features/ErrorPage/ErrorPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'productList',
        index: true,
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
