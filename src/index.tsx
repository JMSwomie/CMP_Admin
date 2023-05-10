import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';

import { LoginPage } from './pages/auth';
import { ProtectedRoute } from './protectedRoute/ProtectedRoute';
import { store } from './store';
import { barSelect, sideBarMode } from './store/slices';

import './index.scss';

// Configure Amplify with AWS Cognito
Amplify.configure(awsExports);

if (localStorage.getItem('barShow') !== null) {
   const barShowStatus: string = JSON.parse(localStorage.getItem('barShow')!);
   store.dispatch(sideBarMode(barShowStatus));
}

if (sessionStorage.getItem('selected') !== null) {
   const childrenSelected: string = JSON.parse(sessionStorage.getItem('selected')!);
   store.dispatch(barSelect(childrenSelected));
}

const root = ReactDOM.createRoot(document.getElementById('root') as Element);

root.render(
   <React.StrictMode>
      <Provider store={store}>
         <BrowserRouter>
            <Routes>
               <Route path='/login' element={<LoginPage />} />
               <Route path='/*' element={<ProtectedRoute />} />
            </Routes>
         </BrowserRouter>
      </Provider>
   </React.StrictMode>
);
