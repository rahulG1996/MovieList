import {configureStore} from '@reduxjs/toolkit';
import MovieReducer from '../reducers/index';

export const store = configureStore({
  reducer: {
    MovieReducer,
  },
});
