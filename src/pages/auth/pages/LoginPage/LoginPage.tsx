import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';

import { LoginInterface } from '../../../../interfaces';
import { setLogin, setUser } from '../../../../store';

import './LoginPage.scss';

export const LoginPage = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const [token, setToken] = useState<string>('');
   const [key, setKey] = useState<string>('');
   const [cognitoUser, setCognitoUser] = useState<string>('');

   // Functions
   const checkUser = async () => {
      try {
         const user: LoginInterface = await Auth.currentAuthenticatedUser();

         if (user) {
            setToken(user.signInUserSession.accessToken.jwtToken);
            setKey(user.keyPrefix);
            setCognitoUser(user.username);
         }
      } catch (error) {
         if (error !== 'The user is not authenticated') console.error(error);
      }
   };

   const handleSignIn = () => {
      Auth.federatedSignIn({ customProvider: 'watech-dol-ivr-portal-1' });
   };

   // Use Effects
   useEffect(() => {
      checkUser();
   }, []);

   useEffect(() => {
      if (cognitoUser && key && token) {
         dispatch(
            setUser({
               accessToken: token,
               keyPrefix: key,
               username: cognitoUser,
            })
         );

         dispatch(setLogin(true));
         navigate('/');
      }
   }, [cognitoUser, key, token]);

   return (
      <section className='loginContainer'>
         <div className='row'>
            <div className='loginForm'>
               <h3>Welcome!</h3>

               <p>
                  Please, proceed to login with your Business Microsoft
                  credentials.
               </p>

               <div className='login' onClick={handleSignIn}>
                  <div className='windowsLogo'>
                     <img
                        src={require('../../../../img/WindowsLogo.png')}
                        alt='windows logo'
                     />
                  </div>

                  <h4>Continue with Microsoft</h4>
               </div>
            </div>
         </div>
      </section>
   );
};
