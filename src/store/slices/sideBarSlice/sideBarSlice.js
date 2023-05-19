import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const sideBarSlice = createSlice({
   name: 'sideBar',
   initialState: {
      barShow: 'show',
   },
   reducers: {
      sideBarMode: (state, action: PayloadAction<string>) => {
         state.barShow = action.payload;
      },
   },
});

// Action creators are generated for each case reducer function
export const { sideBarMode } = sideBarSlice.actions;
