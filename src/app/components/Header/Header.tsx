import { Link, useNavigate } from 'react-router-dom';
import { Button } from '..';
import { routs } from '@/utils/constant/routes';
import { useAuth } from '@/utils/hooks/useAuth';
import { useAppDispatch } from '@/utils/hooks/useAppDispatch';
import { type IUser, setToken, setUserInfo, getUserSelector } from '@/store/slices/authSlice';
import { useAppSelector } from '@/utils/hooks/useAppSelector';
import { staticImg } from '@/utils/constant/staticImg';
import { useCookies } from 'react-cookie';

export const Header = () => {
  const navigate = useNavigate();
  const { isAuth, logOut } = useAuth();
  const dispatch = useAppDispatch();
  const { username, image } = useAppSelector(getUserSelector);
  const [_, __, removeCookie] = useCookies(['authToken']);

  console.log('image', image);

  const handlerLogOut = () => {
    logOut();
    dispatch(setToken(''));
    dispatch(setUserInfo({} as IUser));
    removeCookie('authToken');
  };

  return (
    <div className="flex justify-between items-center">
      <Button
        variant="text"
        className="h-[50px] max-w-[109px] border-0 text-[18px]"
        onClick={() => navigate(routs.ARTICLE)}
      >
        Realworld Blog
      </Button>
      {isAuth ? (
        <div className="flex gap-[19px] items-center">
          <Button
            variant="outlined"
            colorDefault="green"
            className="h-[30px] max-w-[112px] text-[14px]"
            onClick={() => navigate(routs.CREATEARTICLE)}
          >
            Create article
          </Button>

          <Link to={routs.PROFILE} className="flex items-center gap-[12px]">
            <div className="flex flex-col gap-[2px]">
              <span className="text-[18px] text-headingColor">{username}</span>
            </div>
            <div className="w-[46px] h-[46px] rounded-full aspect-square flex items-center justify-center overflow-hidden">
              <img
                className="object-cover w-full h-full aspect-square"
                src={image ? image : staticImg}
                alt="user icon"
              />
            </div>
          </Link>

          <Button variant="outlined" className="h-[50px] max-w-[109px] text-[18px]" onClick={handlerLogOut}>
            Log Out
          </Button>
        </div>
      ) : (
        <div className="flex gap-[19px] items-center">
          <Button
            variant="text"
            className="h-[50px] max-w-[109px] border-0 text-[18px]"
            onClick={() => navigate(routs.LOGIN)}
          >
            Sign In
          </Button>
          <Button
            variant="outlined"
            colorDefault="green"
            className="h-[50px] max-w-[109px] text-[18px]"
            onClick={() => navigate(routs.SIGNUP)}
          >
            Sign Up
          </Button>
        </div>
      )}
    </div>
  );
};
