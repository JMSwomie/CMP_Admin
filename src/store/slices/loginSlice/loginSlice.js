import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
   name: 'login',
   initialState: {
      authStatus: false,
   },
   reducers: {
      setLogin: (state, action: PayloadAction<boolean>) => {
         state.authStatus = action.payload;
      },
      setLogout: (state, action: PayloadAction<boolean>) => {
         state.authStatus = action.payload;
      },
   },
});

// Action creators are generated for each case reducer function
export const { setLogin, setLogout } = loginSlice.actions;
