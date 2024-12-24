import { EmptyHartIcon } from '@/assets/icons/EmptyHartIcon';
import { HartIcon } from '@/assets/icons/HartIcon';
import { useFavoriteArticleMutation, useUnFavoriteArticleMutation } from '@/store/slices/api/articleApi';
import { errorsApiMessage } from '@/utils/constant/errors';
import { useAuth } from '@/utils/hooks/useAuth';
import { Spin } from 'antd';
import { memo } from 'react';
import { toast } from 'react-toastify';

interface LikeArticleProps {
  favorited: boolean;
  likes: number;
  slug: string;
}

interface IError {
  status: string | number;
}

export const LikeArticle = memo(({ favorited, likes, slug }: LikeArticleProps) => {
  const [favorite, { isLoading: isLoadingFavorite }] = useFavoriteArticleMutation();
  const [unFavorite, { isLoading: isLoadingUnFavorite }] = useUnFavoriteArticleMutation();
  const { isAuth } = useAuth();

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

  return (
    <button className="flex gap-[5px] items-center border-0" onClick={handlerFavorite}>
      {(isLoadingFavorite && isAuth) || (isLoadingUnFavorite && isAuth) ? (
        <Spin size="small" />
      ) : (
        <div className="flex gap-[5px] items-center">
          {favorited ? <HartIcon /> : <EmptyHartIcon />}
          <span className="text-[12px] text-textColor">{likes}</span>
        </div>
      )}
    </button>
  );
});
