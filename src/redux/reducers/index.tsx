import {createSlice} from '@reduxjs/toolkit';
import {getMovieList} from '../actions';

type PropType = {
  data: object[];
  isLoading: boolean;
  isSuccess: boolean;
  errorMessage: string;
};

const initialState: PropType = {
  data: [],
  isLoading: true,
  isSuccess: false,
  errorMessage: '',
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
      state.data = payload;
    },
    [getMovieList.rejected]: (state, {payload}) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMessage = payload;
    },
  },
});

export default movieSlice.reducer;
