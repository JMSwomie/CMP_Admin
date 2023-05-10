import React from 'react';
import { useMsal } from '@azure/msal-react';
import { MainPage } from '../pages/main/MainPage';
import { LoginPage } from '../pages/auth';

export const ProtectedRoute = () => {
   const { accounts } = useMsal();
   const isAuthenticated = accounts.length > 0;

   return isAuthenticated ? <MainPage /> : <LoginPage />;
};
