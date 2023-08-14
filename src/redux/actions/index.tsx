import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const getMovieList = createAsyncThunk(
  'user/movieList',
  async (page, {rejectWithValue}) => {
    try {
      const {data} = await axios.get(
        'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
        {
          headers: {
            accept: 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NTQzN2YzYmNjM2NlMjhiZGJkOWY3Y2Y3NGNmYzIwNSIsInN1YiI6IjY0ZGEwMzdmZDEwMGI2MDBlMjZhZGY2NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bAG6mKtGsgjcpzFxBtUaEweJ6XjAaJRneFKJUDD8rfo',
          },
        },
      );

      return data?.results || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
