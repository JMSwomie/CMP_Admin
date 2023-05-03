import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    theme: 'light',
  },
  reducers: {
    themeMode: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { themeMode } = themeSlice.actions;
