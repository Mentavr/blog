import { reduxBaseQuery } from '@/configs/reduxBaseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';
import { ArticleTypeRequest, ArticleTypeResponse, ArticlesTypeRequest, ArticlesTypeResponse } from '../types.slices';

export const articlesApi = createApi({
  reducerPath: 'articlesApi',
  baseQuery: reduxBaseQuery,
  endpoints: (builder) => ({
    getArticles: builder.query<ArticlesTypeResponse, ArticlesTypeRequest>({
      query: (params) => ({
        url: '/articles',
        params: params,
      }),
    }),

    getArticle: builder.query<ArticleTypeResponse, ArticleTypeRequest>({
      query: (params) => ({
        url: `/articles/${params.slug}`,
      }),
    }),
  }),
});

export const { useGetArticlesQuery, useGetArticleQuery } = articlesApi;
