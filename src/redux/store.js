import { configureStore } from '@reduxjs/toolkit';
import storeSynchronize from 'redux-localstore';
import { FilmsSlice } from './slices/films.slice';

export const store = configureStore({ reducer: {
  films: FilmsSlice.reducer,
} });

storeSynchronize(store);
