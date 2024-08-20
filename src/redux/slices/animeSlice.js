import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

export const animeSlice = createSlice({
  name: 'anime',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
});

export const { setItems } = animeSlice.actions;

export default animeSlice.reducer;
