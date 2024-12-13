import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './slices';
import { articlesApi } from './slices/api/articleApi';
import { userApi } from './slices/api/userApi';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(articlesApi.middleware, userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
