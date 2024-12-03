import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './configs/router';
import { AuthProvider } from './context/contextProviders/AuthProvider';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store/store';

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <ReduxProvider store={store}>
      <RouterProvider router={router} />
    </ReduxProvider>
  </AuthProvider>
);
