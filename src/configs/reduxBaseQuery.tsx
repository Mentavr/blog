import { RootState } from '@/store/store';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';

const url = import.meta.env.VITE_API_BASE_URL;

export const reduxBaseQuery = fetchBaseQuery({
  baseUrl: url,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth?.token;
    if (token) {
      headers.set('Authorization', `Token ${token}`);
    }
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});
