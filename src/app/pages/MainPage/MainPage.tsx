import { CardsArticles } from '@/app/components';
import { useGetArticlesQuery } from '@/store/slices/api/articleApi';
import { errorsApiMessage } from '@/utils/constant/errors';
import { Spin } from 'antd';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { sessionStore } from '@/utils/helpers/sessionStore';

export const MainPage = () => {
  const [limit, setLimit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);
  const { setElemToSessionStorage, getElemToSessionStorage } = sessionStore();

  useEffect(() => {
    const limitSession = getElemToSessionStorage('limit');
    const offsetSession = getElemToSessionStorage('offset');
    if (limitSession && offsetSession) {
      setLimit(limitSession);
      setOffset(offsetSession);
    }
  }, []);

  useEffect(() => {
    setElemToSessionStorage('limit', limit);
    setElemToSessionStorage('offset', offset);
  }, [limit, offset]);

  const { data, isError, isLoading, isFetching } = useGetArticlesQuery({ limit: limit, offset: offset });

  if (isError) {
    toast.error(errorsApiMessage.FETCH_ERROR.message);
  }

  return isLoading ? (
    <Spin className="absolute inset-0 top-2/4" size="large" />
  ) : (
    <CardsArticles
      articles={data?.articles}
      articlesCount={data?.articlesCount}
      limit={limit}
      setLimit={setLimit}
      offset={offset}
      setOffset={setOffset}
      isLoadingArticles={isFetching}
    />
  );
};
