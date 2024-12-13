import { HartIcon } from '@/assets/icons/HartIcon';
import { useDeleteArticleMutation, useGetArticleQuery } from '@/store/slices/api/articleApi';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, TagArticle } from '..';
import Markdown from 'react-markdown';
import { useAuth } from '@/utils/hooks/useAuth';
import { routs } from '@/utils/constant/routes';
import { Popover } from 'antd';
import { useState } from 'react';
import { DangerYellowIcon } from '@/assets/icons/DangerYellowIcon';
import { toast } from 'react-toastify';

interface IError {
  originalStatus: number | string;
}

export const Article = () => {
  const [popoverVisible, setPopoverVisible] = useState(false);
  const { slug } = useParams();
  if (!slug) return null;

  const { data } = useGetArticleQuery({ slug });
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  const [deleteArticle, { isError }] = useDeleteArticleMutation();

  const handlerEdit = () => {
    navigate(`${routs.ARTICLE}/${slug}${routs.EDITARTICLE}`);
  };

  const handlerYes = async () => {
    console.log('isError', isError);

    try {
      if (!slug) {
        throw new Error('Не правилььный slug');
      }

      await deleteArticle(slug).unwrap();
      navigate(routs.ARTICLE);
    } catch (error) {
      const { originalStatus } = error as IError;

      if (originalStatus === 403) {
        toast.error('У вас нет прав удалить этот пост');
        navigate(routs.ARTICLE);
      }
      console.error('error');
    }
  };

  const handlerNo = () => {
    setPopoverVisible(false);
  };

  const handlePopoverChange = (open: boolean) => {
    setPopoverVisible(open);
  };

  const popoverContent = (
    <div>
      <p>Требуется авторизация</p>
    </div>
  );

  const popoverDeleteContent = (
    <div className="px-[16px] py-[12px] max-w-[240px] bg-backgroundColorBase">
      <div className="flex gap-[9px] mb-[12px] items-start">
        <div className="w-[14px] h-[14px] absolute top-[28px]">
          <DangerYellowIcon />
        </div>
        <p className="text-[14px] ml-[20px]">Are you sure to delete this article?</p>
      </div>
      <div className="flex gap-[8px] justify-end">
        <Button className="max-w-[34px] max-h-[24px] border-normalColor" onClick={handlerNo}>
          No
        </Button>
        <Button color="primary" className="max-w-[39px] max-h-[24px]" onClick={handlerYes}>
          Yes
        </Button>
      </div>
    </div>
  );

  if (!data) return null;

  const { title, description, body, tagList, createdAt, updatedAt, favorited, favoritesCount, author } = data.article;

  return (
    <article className="w-full px-[16px] pt-[15px] pb-[100px] bg-backgroundColorBase shadow-custom mt-[26px] closePop">
      <header className="flex gap-[4px] flex-col mb-[25px]">
        <div className="flex gap-[4px] items-center justify-between">
          <div className="flex flex-col gap-[4px]">
            <div className="flex gap-[13px] items-center">
              <h3 className="text-primaryColor text-[20px] break-words">{title}</h3>
              <div className="flex gap-[5px] items-center">
                <HartIcon />
                <span className="text-[12px] text-textColor">{favoritesCount}</span>
              </div>
            </div>
            <div className="flex gap-[8px] items-center">
              {tagList?.map((tag, index) => {
                return <TagArticle tag={tag} key={index} />;
              })}
            </div>
          </div>
          <div className="flex items-center gap-[12px]">
            <div className="flex flex-col gap-[2px]">
              <span className="text-[18px] text-headingColor">{author.username}</span>
              <span className="text-textColorSecondary">{createdAt}</span>
            </div>
            <div className="w-[46px] h-[46px] rounded-full aspect-square flex items-center justify-center overflow-hidden">
              <img className="object-cover w-full h-full aspect-square" src={author.image} alt="user icon" />
            </div>
          </div>
        </div>
        <div className="flex gap-[12px] justify-between mt-[20px] items-center">
          <p className="text-[12px] text-textColor">{description}</p>
          <div className="flex gap-[12px]">
            <Popover
              placement={!isAuth ? 'top' : 'rightTop'}
              content={!isAuth ? popoverContent : popoverDeleteContent}
              trigger={!isAuth ? 'hover' : 'click'}
              open={popoverVisible}
              onOpenChange={handlePopoverChange}
            >
              <Button className="max-h-[30px]" variant="outlined" color="danger" disabled={!isAuth}>
                Delete
              </Button>
            </Popover>
            <Popover placement="top" content={!isAuth ? popoverContent : ''}>
              <Button className="max-h-[30px]" colorDefault="green" disabled={!isAuth} onClick={handlerEdit}>
                Edit
              </Button>
            </Popover>
          </div>
        </div>
      </header>
      <main className="flex gap-[12px]">
        <Markdown>{body}</Markdown>
      </main>
    </article>
  );
};
