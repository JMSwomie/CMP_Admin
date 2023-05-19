import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
   accessToken: string;
   keyPrefix: string;
   username: string;
}

const initialState: UserState = {
   accessToken: '',
   keyPrefix: '',
   username: '',
};

export const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      clearUser: (state) => {
         state.accessToken = '';
         state.keyPrefix = '';
         state.username = '';
      },
      setUser: (state, action: PayloadAction<{ accessToken: string, keyPrefix: string, username: string }>) => {
         const { accessToken, keyPrefix, username } = action.payload;
         state.accessToken = accessToken;
         state.keyPrefix = keyPrefix;
         state.username = username;
      },
   },
});

// Action creators are generated for each case reducer function
export const { clearUser, setUser } = userSlice.actions;
