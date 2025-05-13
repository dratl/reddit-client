import { createSlice } from '@reduxjs/toolkit';
import { fetchQueryStats, refreshQueryStats } from './searchThunks';

const predefinedQueries = [
  'fernandez noroña',
  'andrea chavez',
  'ernesto zedillo',
  'claudia sheinbaum',
  'felipe calderon',
  'luis donaldo colosio',
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
  reducers: {
    addQuery: (state, action) => {
      if (!state.queries.includes(action.payload)) {
        state.queries.push(action.payload);
      }
    },
    removeQuery: (state, action) => {
      state.queries = state.queries.filter(query => query !== action.payload);
      delete state.stats[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQueryStats.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchQueryStats.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.stats = action.payload;
      })
      .addCase(fetchQueryStats.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(refreshQueryStats.fulfilled, (state, action) => {
        state.stats[action.payload.query] = action.payload.stats;
      });
  },
});

export const { addQuery, removeQuery } = searchSlice.actions;

export const selectAllQueries = (state) => state.search.queries;
export const selectQueryStats = (state) => state.search.stats;
export const selectSearchStatus = (state) => state.search.status;
export const selectSearchError = (state) => state.search.error;

export default searchSlice.reducer;