import { reduxBaseQuery } from '@/configs/reduxBaseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';
import { ArticleTypeRequest, ArticleTypeResponse, ArticlesTypeRequest, ArticlesTypeResponse } from '../types.slices';

export const articlesApi = createApi({
  reducerPath: 'articlesApi',
  baseQuery: reduxBaseQuery,
  tagTypes: ['Articles', 'Article'],
  endpoints: (builder) => ({
    getArticles: builder.query<ArticlesTypeResponse, ArticlesTypeRequest>({
      query: (params) => ({
        url: '/articles',
        params: params,
      }),
      providesTags: ['Articles'],
    }),

    getArticle: builder.query<ArticleTypeResponse, ArticleTypeRequest>({
      query: (params) => ({
        url: `/articles/${params.slug}`,
      }),
      keepUnusedDataFor: 0,
      // providesTags: (_, __, { slug }) => [{ type: 'Article', id: slug }],
    }),

    deleteArticle: builder.mutation({
      query: (slug) => ({
        url: `/articles/${slug}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, slug) => [{ type: 'Article', id: slug }, 'Articles'],
    }),

    createArticle: builder.mutation({
      query: (params) => ({
        url: '/articles',
        method: 'POST',
        body: { article: params },
      }),
      invalidatesTags: ['Articles'],
    }),

    updateArticle: builder.mutation({
      query: ({ slug, params }) => ({
        url: `/articles/${slug}`,
        method: 'PUT',
        body: { article: params },
      }),
      invalidatesTags: (_, __, slug) => [{ type: 'Article', id: slug }, 'Articles'],
    }),

    favoriteArticle: builder.mutation({
      query: (slug) => ({
        url: `/articles/${slug}/favorite`,
        method: 'POST',
      }),

      invalidatesTags: (_, __, slug) => [{ type: 'Article', id: slug }, 'Articles'],
    }),

    unFavoriteArticle: builder.mutation({
      query: (slug) => ({
        url: `/articles/${slug}/favorite`,
        method: 'DELETE',
      }),

      invalidatesTags: (_, __, slug) => [{ type: 'Article', id: slug }, 'Articles'],
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useGetArticleQuery,
  useDeleteArticleMutation,
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useFavoriteArticleMutation,
  useUnFavoriteArticleMutation,
} = articlesApi;
