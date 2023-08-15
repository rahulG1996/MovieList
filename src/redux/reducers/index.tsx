import {createSlice} from '@reduxjs/toolkit';
import {getMovieList, getSearchList} from '../actions';

type PropType = {
  data: object[];
  isLoading: boolean;
  isSuccess: boolean;
  errorMessage: string;
  searchData: object[];
  isLoadingSearch: boolean;
  totalPage: number;
  totalPageSearch: number;
};

const initialState: PropType = {
  data: [],
  isLoading: true,
  isSuccess: false,
  errorMessage: '',
  searchData: [],
  isLoadingSearch: true,
  totalPage: 0,
  totalPageSearch: 0,
};

export const movieSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: {
    [getMovieList.pending]: state => {
      state.isLoading = true;
    },
    [getMovieList.fulfilled]: (state, {payload}) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = payload.results || [];
      state.totalPage = payload.total_pages;
    },
    [getMovieList.rejected]: (state, {payload}) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMessage = payload;
    },
    [getSearchList.pending]: state => {
      state.isLoadingSearch = true;
    },
    [getSearchList.fulfilled]: (state, {payload}) => {
      state.isLoadingSearch = false;
      state.searchData = payload.results;
      state.totalPageSearch = payload.total_pages;
    },
    [getSearchList.rejected]: (state, {payload}) => {
      state.isLoadingSearch = false;
      state.errorMessage = payload;
    },
  },
});

export default movieSlice.reducer;
