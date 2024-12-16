import { Header } from '@/app/components/Header/Header';
import { useGetUserQuery } from '@/store/slices/api/userApi';

import { routs } from '@/utils/constant/routes';
import { useAuth } from '@/utils/hooks/useAuth';
import { Spin } from 'antd';
import { useEffect } from 'react';
import { Cookies, withCookies } from 'react-cookie';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

interface LayoutProps {
  cookies: Cookies;
}

export const Layout = withCookies(({ cookies }: LayoutProps) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const location = useLocation();

  const token = cookies.get('authToken');
  const { error, isLoading } = useGetUserQuery(token, { skip: !token });

  useEffect(() => {
    if (token && !error) {
      login();
    }

    if (location.pathname === routs.MAIN) {
      navigate(routs.ARTICLE);
    }
  }, []);

  useEffect(() => {
    if (error) {
      cookies.remove('authToken');
      navigate(routs.LOGIN);
    }
  }, [error, cookies, navigate]);

  return (
    <div>
      <div className="w-full bg-backgroundColorBase px-[22px] py-[15px]">
        <Header />
      </div>
      <div className="xl:max-w-[1400px] max-w-[764px] mx-auto ">
        <div className="xl:w-[67%] w-[88%] mx-auto">
          {isLoading ? <Spin className="absolute inset-0 top-2/4" size="large" /> : <Outlet />}
        </div>
      </div>
    </div>
  );
});
