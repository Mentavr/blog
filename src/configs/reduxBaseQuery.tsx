import { fetchBaseQuery } from '@reduxjs/toolkit/query';

const url = import.meta.env.VITE_API_BASE_URL;

export const reduxBaseQuery = fetchBaseQuery({
  baseUrl: url,
  prepareHeaders: (headers) => {
    // headers.set('Authorization', `Bearer YOUR_ACCESS_TOKEN`);
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});
