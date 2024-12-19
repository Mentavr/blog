import { HartIcon } from '@/assets/icons/HartIcon';
import {
  useDeleteArticleMutation,
  useFavoriteArticleMutation,
  useGetArticleQuery,
  useUnFavoriteArticleMutation,
} from '@/store/slices/api/articleApi';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, TagArticle } from '..';
import Markdown from 'react-markdown';
import { useAuth } from '@/utils/hooks/useAuth';
import { routs } from '@/utils/constant/routes';
import { Popover } from 'antd';
import { useState } from 'react';
import { DangerYellowIcon } from '@/assets/icons/DangerYellowIcon';
import { toast } from 'react-toastify';
import { EmptyHartIcon } from '@/assets/icons/EmptyHartIcon';
import { errorsApiMessage } from '@/utils/constant/errors';
import { formatDate } from '@/utils/helpers/formatDate';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import cls from './style.module.css';
import { localStore } from '@/utils/helpers/localStorage';
import { sessionStore } from '@/utils/helpers/sessionStore';
import clsx from 'clsx';

interface IError {
  originalStatus: number | string;
}

interface IError {
  status: string | number;
}

export const Article = () => {
  const { removeElemToLocalStorage } = localStore();
  const { setElemToSessionStorage } = sessionStore();
  removeElemToLocalStorage('createArticleOptions');
  removeElemToLocalStorage('editArticleOptions');

  const [popoverVisible, setPopoverVisible] = useState(false);
  const { slug } = useParams();
  if (!slug) return null;

  const { data } = useGetArticleQuery({ slug });
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  const [deleteArticle] = useDeleteArticleMutation();
  const [favorite] = useFavoriteArticleMutation();
  const [unFavorite] = useUnFavoriteArticleMutation();

  const handlerFavorite = async () => {
    try {
      favorited ? await unFavorite(slug).unwrap() : await favorite(slug).unwrap();
    } catch (error) {
      const { status } = error as IError;
      if (status === errorsApiMessage[401].name) {
        toast.error(errorsApiMessage[401].message);
      }

      if (status === errorsApiMessage.FETCH_ERROR.name) {
        toast.error(errorsApiMessage.FETCH_ERROR.message);
      }
    }
  };

  const handlerEdit = () => {
    navigate(`${routs.ARTICLE}/${slug}${routs.EDITARTICLE}`);
  };

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

  const { title, description, body, tagList, createdAt, favorited, favoritesCount, author } = data.article;

  return (
    <article className="w-full px-[16px] pt-[15px] pb-[100px] bg-backgroundColorBase shadow-custom mt-[26px] closePop">
      <header className="flex gap-[4px] flex-col mb-[25px]">
        <div className="flex gap-[4px] items-center justify-between">
          <div className="flex flex-col gap-[4px]">
            <div className="flex gap-[13px] items-center">
              <h3 className="text-primaryColor text-[20px] break-words">{title}</h3>
              <button className="flex gap-[5px] items-center border-0" onClick={handlerFavorite}>
                {favorited ? <HartIcon /> : <EmptyHartIcon />}
                <span className="text-[12px] text-textColor">{favoritesCount}</span>
              </button>
            </div>
            <div className="flex gap-[8px] items-center">
              {tagList?.map((tag, index) => {
                return <TagArticle tag={tag} key={index} />;
              })}
            </div>
          </div>
          <div className="flex items-center gap-[12px]">
            <div className="flex flex-col gap-[2px] items-end">
              <span className="text-[18px] text-headingColor">{author.username}</span>
              <span className="text-textColorSecondary">{formatDate(createdAt)}</span>
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
      <main className="flex gap-[12px] flex-col">
        <Markdown
          remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
          rehypePlugins={[rehypeRaw]}
          components={{
            ul: ({ node, ...props }) => <ul className={cls.ulCls} {...props} />,
            ol: ({ node, ...props }) => <ol className={cls.olCls} {...props} />,
            li: ({ node, ...props }) => <li className={cls.liCls} {...props} />,
            h2: ({ node, ...props }) => <h2 className={cls.h2Cls} {...props} />,
            h3: ({ node, ...props }) => <h3 className={cls.h3Cls} {...props} />,
            h4: ({ node, ...props }) => <h4 className={cls.h4Cls} {...props} />,
            h5: ({ node, ...props }) => <h5 className={cls.h5Cls} {...props} />,
            h6: ({ node, ...props }) => <h6 className={cls.h6Cls} {...props} />,
            // img: ({ node, ...props }) => <img className="imgCls" {...props} />,
          }}
        >
          {body}
        </Markdown>
      </main>
    </article>
  );
};
