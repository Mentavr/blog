import { InteractionArticle } from '@/app/components';
import { useGetArticleQuery } from '@/store/slices/api/articleApi';
import { localStore } from '@/utils/helpers/localStorage';
import { Spin } from 'antd';
import { useEffect } from 'react';

import { useParams } from 'react-router-dom';

export const EditArticlePage = () => {
  const { slug } = useParams();

  const { setElemToLocalStorage, getElemToLocalStorage } = localStore();

  const storageValue = getElemToLocalStorage('editArticleOptions');

  if (!slug) return;

  const { data, refetch, isLoading } = useGetArticleQuery({ slug });

  useEffect(() => {
    refetch();
  }, [slug, refetch]);

  if (!storageValue) {
    setElemToLocalStorage(
      'editArticleOptions',
      JSON.stringify({
        desc: data?.article.description ?? '',
        title: data?.article.title ?? '',
        tags: data?.article.tagList ?? [],
        body: data?.article.body ?? '',
      })
    );
  }

  return isLoading ? <Spin className="absolute inset-0 top-2/4" size="large" /> : <InteractionArticle slug={slug} />;
};
