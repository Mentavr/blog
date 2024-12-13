import { CardsArticles } from '@/app/components';
import { useGetArticlesQuery } from '@/store/slices/api/articleApi';
import { Spin } from 'antd';
import { useState } from 'react';
import { toast } from 'react-toastify';

export const MainPage = () => {
  const [limit, setLimit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);

  const { data, isError, isLoading } = useGetArticlesQuery({ limit: limit, offset: offset });
  console.log('isLoading', isLoading);
  if (isError) {
    console.error(isError);
    toast.error('Проблема с сетью, попробуйте выключить vpn');
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
    />
  );
};
