// import { useGetMeQuery } from "@/store/services/auth";
import { Navigate, Outlet } from 'react-router';

export const PrivateRoute = () => {
  // const { data, isLoading, isError } = useGetMeQuery();
  // if (isLoading) return null

  // const isAuth = !isError;
  const isAuth = true;

  return isAuth ? <Outlet /> : <Navigate to={'/login'} />;
};
