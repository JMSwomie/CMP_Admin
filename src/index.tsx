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
      userPoolId: 'us-west-2_1RL0GZu5g',
      userPoolWebClientId: '18qv743as8dkemngjhion5diau',
      oauth: {
         domain: 'dolcrdmgmtportal.auth.us-west-2.amazoncognito.com',
         scope: ['email', 'openid'],
         redirectSignIn: 'https://master.d1ef8mp99yrbex.amplifyapp.com/',
         redirectSignOut: 'https://master.d1ef8mp99yrbex.amplifyapp.com/',
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
