import { combineReducers } from 'redux';
import { articlesApi } from './api/articleApi';

const rootReducer = combineReducers({
  [articlesApi.reducerPath]: articlesApi.reducer,
});

export default rootReducer;
