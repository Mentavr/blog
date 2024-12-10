import { Articles } from '@/app/components/Articles/Articles';
import { useGetArticlesQuery } from '@/store/slices/api/articleApi';
import { useState } from 'react';

export const MainPage = () => {
  const [limit, setLimit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);

  const { data } = useGetArticlesQuery({ limit: limit, offset: offset });
  if (!data) return;

  return data ? (
    <Articles
      articles={data.articles}
      articlesCount={data.articlesCount}
      limit={limit}
      setLimit={setLimit}
      offset={offset}
      setOffset={setOffset}
    />
  ) : null;
};
