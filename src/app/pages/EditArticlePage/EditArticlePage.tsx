import { InteractionArticle } from '@/app/components';
import { useGetArticleQuery } from '@/store/slices/api/articleApi';
import { useEffect } from 'react';

import { useParams } from 'react-router-dom';

export const EditArticlePage = () => {
  const { slug } = useParams();
  if (!slug) return;

  const { data, refetch } = useGetArticleQuery({ slug });

  useEffect(() => {
    refetch();
  }, [slug, refetch]);

  return (
    <InteractionArticle
      description={data?.article.description}
      title={data?.article.title}
      slug={data?.article.slug}
      body={data?.article.body}
      tags={data?.article.tagList ?? []}
    />
  );
};
