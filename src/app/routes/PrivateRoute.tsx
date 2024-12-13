import { routs } from '@/utils/constant/routes';
import { useAuth } from '@/utils/hooks/useAuth';
import { Navigate, Outlet } from 'react-router';

export const PrivateRoute = () => {
  const { isAuth } = useAuth();
  return isAuth ? <Outlet /> : <Navigate to={routs.LOGIN} />;
};
