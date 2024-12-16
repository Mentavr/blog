import { Outlet, createBrowserRouter } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import {
  ArticlePage,
  CreateArticlePage,
  EditArticlePage,
  Layout,
  LoginPage,
  MainPage,
  ProfilePage,
  SignUpPage,
} from '../pages';
import { routs } from '@/utils/constant/routes';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    path: routs.MAIN,
    children: [
      {
        element: <PrivateRoute />,
        children: [
          { path: `${routs.ARTICLE}/:slug${routs.EDITARTICLE}`, element: <EditArticlePage /> },
          { path: routs.CREATEARTICLE, element: <CreateArticlePage /> },
          { path: routs.PROFILE, element: <ProfilePage /> },
        ],
      },
      {
        element: <Outlet />,
        children: [
          { path: routs.LOGIN, element: <LoginPage /> },
          { path: routs.SIGNUP, element: <SignUpPage /> },
          {
            path: routs.ARTICLE,
            element: <MainPage />,
          },
          {
            path: `${routs.ARTICLE}/:slug`,
            element: <ArticlePage />,
          },
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
