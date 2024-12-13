import { reduxBaseQuery } from '@/configs/reduxBaseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';
import { setToken, setUserInfo } from '../authSlice';
import { toast } from 'react-toastify';
import { UserTypeResponse } from '../types.slices';

interface IError extends Error {
  status: number | string;
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: reduxBaseQuery,
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

          if (status === 'FETCH_ERROR') {
            toast.error('Ошибка запроса, проверте интернет соединение');
          }

          console.error('Login failed:', error);
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

          if (status === 'FETCH_ERROR') {
            toast.error('Ошибка запроса, проверте интернет соединение');
          }

          console.error('Login failed:', error);
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
        } catch (error) {
          const { status } = error as IError;

          if (status === 'FETCH_ERROR') {
            toast.error('Ошибка запроса, проверте интернет соединение');
          }

          console.error('Login failed:', error);
        }
      },
    }),
  }),
});

export const { useGetLoginUserMutation, useGetSingUpMutation, useGetUserQuery } = userApi;
