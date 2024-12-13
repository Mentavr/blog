import { Outlet, createBrowserRouter } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { ArticlePage, CreateArticlePage, EditArticlePage, Layout, LoginPage, MainPage, SignUpPage } from '../pages';
import { routs } from '@/utils/constant/routes';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    path: routs.MAIN,
    children: [
      {
        element: <Outlet />,
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
        element: <PrivateRoute />,
        children: [
          { path: `${routs.ARTICLE}/:slug${routs.EDITARTICLE}`, element: <EditArticlePage /> },
          { path: routs.CREATEARTICLE, element: <CreateArticlePage /> },
        ],
      },
      {
        element: <Outlet />,
        children: [
          { path: routs.LOGIN, element: <LoginPage /> },
          { path: routs.SIGNUP, element: <SignUpPage /> },
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
