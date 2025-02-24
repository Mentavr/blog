import { createRoot } from 'react-dom/client';
import './global.css';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/contextProviders/AuthProvider';
import { Provider as ReduxProvider } from 'react-redux';
import { App } from 'antd';
import { store } from './store/store';
import { router } from './app/routes/router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CookiesProvider } from 'react-cookie';

createRoot(document.getElementById('root')!).render(
  <CookiesProvider defaultSetOptions={{ path: '/' }}>
    <AuthProvider>
      <ReduxProvider store={store}>
        <RouterProvider router={router} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </ReduxProvider>
    </AuthProvider>
  </CookiesProvider>
);
