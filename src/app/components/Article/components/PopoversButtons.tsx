import { Popover } from 'antd';
import { Button } from '../..';
import { DangerYellowIcon } from '@/assets/icons/DangerYellowIcon';
import { sessionStore } from '@/utils/helpers/sessionStore';
import { toast } from 'react-toastify';
import { useAuth } from '@/utils/hooks/useAuth';
import { routs } from '@/utils/constant/routes';
import { useNavigate } from 'react-router-dom';
import { useDeleteArticleMutation } from '@/store/slices/api/articleApi';
import { useState } from 'react';

interface IError {
  originalStatus: number | string;
}

interface IError {
  status: string | number;
}

interface PopoversButtonsProps {
  slug: string;
}

export const PopoversButtons = ({ slug }: PopoversButtonsProps) => {
  const [popoverVisible, setPopoverVisible] = useState(false);
  const { setElemToSessionStorage } = sessionStore();
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  const [deleteArticle, { isLoading }] = useDeleteArticleMutation();

  const handlerEdit = () => {
    navigate(`${routs.ARTICLE}/${slug}${routs.EDITARTICLE}`);
  };

  const handlePopoverChange = (open: boolean) => {
    setPopoverVisible(open);
  };

  const popoverContent = (
    <div>
      <p>Требуется авторизация</p>
    </div>
  );

  const handlerYes = async () => {
    try {
      if (!slug) {
        throw new Error('Не правилььный slug');
      }

      await deleteArticle(slug).unwrap();
      navigate(routs.ARTICLE);
      setElemToSessionStorage('page', 1);
      setElemToSessionStorage('limit', 10);
      setElemToSessionStorage('offset', 0);
    } catch (error) {
      const { originalStatus } = error as IError;

      if (originalStatus === 403) {
        toast.error('У вас нет прав удалить этот пост');
        navigate(routs.ARTICLE);
      }
    }
  };

  const handlerNo = () => {
    setPopoverVisible(false);
  };

  const popoverDeleteContent = (
    <div className="px-[16px] py-[12px] max-w-[240px] bg-backgroundColorBase">
      <div className="flex gap-[9px] mb-[12px] items-start">
        <div className="w-[14px] h-[14px] absolute top-[28px]">
          <DangerYellowIcon />
        </div>
        <p className="text-[14px] ml-[20px]">Are you sure to delete this article?</p>
      </div>
      <div className="flex gap-[8px] justify-end">
        <Button className="max-w-[34px] max-h-[24px] border-normalColor" onClick={handlerNo} disabled={isLoading}>
          No
        </Button>
        <Button color="primary" className="max-w-[39px] max-h-[24px]" onClick={handlerYes} disabled={isLoading}>
          Yes
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex gap-[12px]">
      <Popover
        placement={!isAuth ? 'top' : 'rightTop'}
        content={!isAuth ? popoverContent : popoverDeleteContent}
        trigger={!isAuth ? 'hover' : 'click'}
        open={popoverVisible}
        onOpenChange={handlePopoverChange}
      >
        <Button className="max-h-[30px]" variant="outlined" color="danger" disabled={!isAuth || isLoading}>
          Delete
        </Button>
      </Popover>
      <Popover placement="top" content={!isAuth ? popoverContent : ''}>
        <Button className="max-h-[30px]" colorDefault="green" disabled={!isAuth || isLoading} onClick={handlerEdit}>
          Edit
        </Button>
      </Popover>
    </div>
  );
};
