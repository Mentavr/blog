import { Outlet, createBrowserRouter } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { Layout, LoginPage, MainPage, SignUpPage } from '../pages';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    path: '/',
    children: [
      {
        element: <PrivateRoute />,
        children: [
          {
            path: '/main',
            element: <MainPage />,
          },
          {
            path: '/profile',
            element: <div>Profile</div>,
          },
        ],
      },
      {
        element: <Outlet />,
        children: [
          { path: '/login', element: <LoginPage /> },
          { path: '/signUp', element: <SignUpPage /> },
        ],
      },
    ],
  },
  {
    element: <Outlet />,
    children: [
      {
        path: '*',
        element: <div>Error Page</div>,
      },
    ],
  },
]);
