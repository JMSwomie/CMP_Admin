import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    authStatus: '',
  },
  reducers: {
    setLogin: (state, action: PayloadAction<string>) => {
      state.authStatus = action.payload;
    },
    setLogout: (state, action: PayloadAction<string>) => {
      state.authStatus = action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const { setLogin, setLogout } = loginSlice.actions;