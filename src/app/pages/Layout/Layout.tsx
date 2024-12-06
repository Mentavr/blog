import { Header } from '@/app/components/Header/Header';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <div>
      <div className="w-full bg-backgroundColorBase px-[22px] py-[15px]">
        {/* <div className="xl:max-w-[1400px] max-w-[764px] mx-auto bg-[yellow]">
          <div className="xl:w-[67%] w-[88%] bg-[blue] mx-auto"> */}
        <Header />
        {/* </div>
        </div> */}
      </div>
      <div className="xl:max-w-[1400px] max-w-[764px] mx-auto ">
        <div className="xl:w-[67%] w-[88%] mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
