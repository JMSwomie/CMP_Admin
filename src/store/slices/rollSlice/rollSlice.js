import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export const rollSlice = createSlice({
  name: 'roll',
  initialState: {
    roll: 'user',
  },
  reducers: {
    setRoll: (state, action: PayloadAction<string>) => {
      state.roll = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRoll } = rollSlice.actions;