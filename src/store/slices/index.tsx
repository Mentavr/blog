import { combineReducers } from 'redux';
import { articlesApi } from './api/articleApi';
import { userApi } from './api/userApi';
import authSlice from './authSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  [articlesApi.reducerPath]: articlesApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
});

export default rootReducer;
