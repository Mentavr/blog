import { reduxBaseQuery } from '@/configs/reduxBaseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';
import { setToken, setUserInfo } from '../authSlice';
import { toast } from 'react-toastify';
import { UserTypeResponse } from '../types.slices';
import { errorsApiMessage } from '@/utils/constant/errors';
import { articlesApi } from './articleApi';

interface IError extends Error {
  status: number | string;
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: reduxBaseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getLoginUser: builder.mutation({
      query: (params) => ({
        url: '/users/login',
        method: 'POST',
        body: params,
      }),

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setToken(data.user.token));
          dispatch(setUserInfo(data.user));
        } catch (error) {
          const { status } = error as IError;

          if (status === errorsApiMessage.FETCH_ERROR.name) {
            toast.error(errorsApiMessage.FETCH_ERROR.message);
          }
        }
      },
    }),

    getSingUp: builder.mutation({
      query: (params) => ({
        url: '/users',
        method: 'POST',
        body: params,
      }),

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setToken(data.user.token));
          dispatch(setUserInfo(data.user));
        } catch (error) {
          const { status } = error as IError;

          if (status === errorsApiMessage.FETCH_ERROR.name) {
            toast.error(errorsApiMessage.FETCH_ERROR.message);
          }
        }
      },
    }),

    getUser: builder.query<UserTypeResponse, string>({
      query: (token) => ({
        url: '/user',
        headers: {
          Authorization: `Token ${token}`,
        },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setToken(data.user.token));
          dispatch(setUserInfo(data.user));
          dispatch(articlesApi.util.invalidateTags(['Articles']));
        } catch (error) {
          const { status } = error as IError;

          if (status === errorsApiMessage.FETCH_ERROR.name) {
            toast.error(errorsApiMessage.FETCH_ERROR.message);
          }
        }
      },
    }),

    updateUser: builder.mutation({
      query: (params) => ({
        url: '/user',
        method: 'PUT',
        body: { user: params },
      }),

      invalidatesTags: ['User'],

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setToken(data.user.token));
          dispatch(setUserInfo(data.user));
          dispatch(articlesApi.util.invalidateTags(['Articles']));
        } catch (error) {
          const { status } = error as IError;

          if (status === errorsApiMessage.FETCH_ERROR.name) {
            toast.error(errorsApiMessage.FETCH_ERROR.message);
          }
        }
      },
    }),
  }),
});

export const { useGetLoginUserMutation, useGetSingUpMutation, useGetUserQuery, useUpdateUserMutation } = userApi;
