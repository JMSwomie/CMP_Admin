import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { Amplify } from 'aws-amplify';

import { ProtectedRoute } from './protectedRoute/ProtectedRoute';
import { barSelect, sideBarMode, store } from './store';

import './index.scss';

const awsExports = {
   Auth: {
      region: 'us-west-2',
      userPoolId: 'us-west-2_tnF21pSSA',
      userPoolWebClientId: '6e86t9qc9i2kp48hanna2bfgi8',
      oauth: {
         domain: 'sync-dev.auth.us-west-2.amazoncognito.com',
         scope: ['email', 'openid'],
         redirectSignIn: 'http://localhost:3000/',
         redirectSignOut: 'http://localhost:3000/',
         responseType: 'code',
      },
   },
};

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
               <Route path='/*' element={<ProtectedRoute />} />
            </Routes>
         </BrowserRouter>
      </Provider>
   </React.StrictMode>
);
