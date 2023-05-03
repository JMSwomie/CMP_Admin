import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { PublicClientApplication, EventType } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';

import { LoginPage } from './pages/auth';
import { ProtectedRoute } from './protectedRoute/ProtectedRoute';
import { store } from './store';
import { barSelect, sideBarMode } from './store/slices';

import './index.scss';
import { MSalInterface } from './interfaces';

if (localStorage.getItem('barShow') !== null) {
   const barShowStatus: string = JSON.parse(localStorage.getItem('barShow')!);
   store.dispatch(sideBarMode(barShowStatus));
}

if (sessionStorage.getItem('selected') !== null) {
   const childrenSelected: string = JSON.parse(sessionStorage.getItem('selected')!);
   store.dispatch(barSelect(childrenSelected));
}

const pca = new PublicClientApplication({
   auth: {
      clientId: 'db14e44f-1c77-461b-8543-95c7de76f8f5',
      authority: 'https://login.microsoftonline.com/e454889e-a6fa-4539-a041-213166e11ed4',
      redirectUri: '/',
   },
   cache: {
      cacheLocation: 'localStorage',
      storeAuthStateInCookie: false,
   },
});

pca.addEventCallback((event) => {
   if (event.eventType === EventType.LOGIN_SUCCESS) {
      console.log(event);

      const payload: MSalInterface = event.payload as MSalInterface;

      if (payload) {
         // pca.setActiveAccount(payload.account);
      }
   }
});

const root = ReactDOM.createRoot(document.getElementById('root') as Element);

root.render(
   <React.StrictMode>
      <Provider store={store}>
         <BrowserRouter>
            <MsalProvider instance={pca}>
               <Routes>
                  <Route path='/login' element={<LoginPage />} />
                  <Route path='/*' element={<ProtectedRoute />} />
               </Routes>
            </MsalProvider>
         </BrowserRouter>
      </Provider>
   </React.StrictMode>
);
