import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const sideBarSelectSlice = createSlice({
   name: 'sideBarSelect',
   initialState: {
      componentSelect: 'Prompt',
   },
   reducers: {
      barSelect: (state, action: PayloadAction<string>) => {
         state.componentSelect = action.payload;
      },
   },
});

// Action creators are generated for each case reducer function
export const { barSelect } = sideBarSelectSlice.actions;
