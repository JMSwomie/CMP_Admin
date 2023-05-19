import { useSelector } from 'react-redux';

import { LoginPage } from '../pages/auth';
import { MainPage } from '../pages/main/MainPage';

export const ProtectedRoute = () => {
   const { authStatus } = useSelector((state: any) => state.login);

   return authStatus ? <MainPage /> : <LoginPage />;
};
