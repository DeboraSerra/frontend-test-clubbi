import { createSlice } from '@reduxjs/toolkit';
import { defineState } from 'redux-localstore';

const initialState = defineState({
  films: [],
  favorites: [],
})('films');

export const FilmsSlice = createSlice({
  name: `films`,
  initialState,
  reducers: {
    addToFavorites: (state, { payload }) => {
      state.favorites.push(payload);
      return state;
    },
    setFilms: (state, { payload }) => {
      state.films = payload;
      return state;
    },
    removeFromFavorites: (state, { payload }) => {
      state.favorites = state.favorites.filter(({ id }) => id !== payload.id );
      return state;
    }
  }
})

export const { addToFavorites, setFilms, removeFromFavorites } = FilmsSlice.actions;
