import { createBrowserRouter, Navigate } from 'react-router-dom'
import App from '../App'
import Login from '../pages/login/Login'
import SignUp from '../pages/singUp/SignUp'
import PrivateRoute from './PrivateRoute'
import Home from '../pages/home/Home'
import Search from '../pages/search/Search'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to='/login' replace />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <SignUp />
      },
      {
        path: '/home',
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        )
      },
      {
        path: '/search',
        element: (
          <PrivateRoute>
            <Search />
          </PrivateRoute>
        )
      }
    ]
  }
])

export default router
