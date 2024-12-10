import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './slices';
import { articlesApi } from './slices/api/articleApi';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(articlesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
