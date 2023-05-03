import { configureStore } from '@reduxjs/toolkit';
import { loginSlice, sideBarSelectSlice, sideBarSlice, themeSlice } from './slices';

export const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
    sideBar: sideBarSlice.reducer,
    sideBarSelect: sideBarSelectSlice.reducer,
    theme: themeSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
