import { createRoot } from 'react-dom/client';
import './global.css';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/contextProviders/AuthProvider';
import { Provider as ReduxProvider } from 'react-redux';
import { App } from 'antd';
import { store } from './store/store';
import { router } from './app/routes/router';

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <ReduxProvider store={store}>
      <RouterProvider router={router} />
      <App />
    </ReduxProvider>
  </AuthProvider>
);
