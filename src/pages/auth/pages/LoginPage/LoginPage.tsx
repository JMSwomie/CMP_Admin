import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from '@aws-amplify/auth';
// import awsExports from '../../../../aws-exports';

import './LoginPage.scss';

export const LoginPage = () => {
   const navigate = useNavigate();

   useEffect(() => {
      checkUser();
   }, []);

   const checkUser = async () => {
      try {
         const user = await Auth.currentAuthenticatedUser();
         if (user) {
            navigate('/');
         }
      } catch (error) {
         console.log('User is not logged in');
      }
   };

   const handleSignIn = async () => {
      try {
         const provider = 'Microsoft';
         await Auth.federatedSignIn({ customProvider: provider });
      } catch (error) {
         console.error('Error signing in:', error);
      }
   };

   return (
      <section className='loginContainer'>
         <div className='row'>
            <div className='loginForm'>
               <h3>Welcome!</h3>

               <p>Please, proceed to login with your Business Microsoft credentials.</p>

               <div className='login' onClick={handleSignIn}>
                  <div className='windowsLogo'>
                     <img src={require('../../../../img/WindowsLogo.png')} alt='windows logo' />
                  </div>

                  <h4>Continue with Microsoft</h4>
               </div>
            </div>
         </div>
      </section>
   );
};
