import { Outlet, createBrowserRouter } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { Layout, LoginPage, MainPage, SignUpPage } from '../pages';
import { ArticlePage } from '../pages/ArticlePage/ArticlePage';
import { routs } from '@/utils/constant/routes';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    path: routs.MAIN,
    children: [
      {
        element: <PrivateRoute />,
        children: [
          {
            path: routs.ARTICLE,
            element: <MainPage />,
          },
          {
            path: `${routs.ARTICLE}/:slug`,
            element: <ArticlePage />,
          },
          {
            path: routs.PROFILE,
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
        path: routs.ALL,
        element: <div>Error Page</div>,
      },
    ],
  },
]);
