import { createSlice } from '@reduxjs/toolkit';
import { fetchMultipleQueriesStats } from '../../api/redditApi';

const predefinedQueries = [
  'fernandez noroña',
  'andrea chavez',
  'ernesto zedillo',
  'claudia sheinbaum',
  'alito moreno'
];

const initialState = {
  queries: predefinedQueries,
  stats: {},
  status: 'idle',
  error: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMultipleQueriesStats.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMultipleQueriesStats.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.stats = action.payload;
      })
      .addCase(fetchMultipleQueriesStats.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectAllQueries = (state) => state.search.queries;
export const selectQueryStats = (state) => state.search.stats;
export const selectSearchStatus = (state) => state.search.status;
export const selectSearchError = (state) => state.search.error;

export default searchSlice.reducer;