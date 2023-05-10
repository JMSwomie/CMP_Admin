import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth, Hub, Logger } from 'aws-amplify';

import './LoginPage.scss';

export const LoginPage = () => {
   const navigate = useNavigate();

   const checkUser = async () => {
      try {
         const user = await Auth.currentAuthenticatedUser();
         console.log('user result', user);
         getSession();

         if (user) {
            navigate('/');
         }
      } catch (error) {
         console.log('User is not logged in');
      }
   };

   const getSession = async () => {
      try {
         const session = await Auth.currentSession();
         console.log(session);
         console.log(session.getIdToken().getJwtToken()); // ID Token
         console.log(session.getAccessToken().getJwtToken()); // Access Token
         console.log(session.getRefreshToken().getToken()); // Refresh Token
      } catch (error) {
         console.error('Error getting current user session:', error);
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

   // Use Effects
   useEffect(() => {
      checkUser();
   }, []);

   useEffect(() => {
      Hub.listen('auth', (data) => {
         const { payload } = data;
         console.log('A new auth event has happened: ', data);
         if (payload.event === 'signIn') {
            console.log('a user has signed in!');
         }
         if (payload.event === 'signOut') {
            console.log('a user has signed out!');
         }
      });
   }, []);

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

// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Auth } from '@aws-amplify/auth';

// import './LoginPage.scss';

// export const LoginPage = () => {
//    const navigate = useNavigate();

//    // Anonymous functions
//    const checkUser = async () => {
//       try {
//          const user = await Auth.currentAuthenticatedUser();
//          if (user) {
//             navigate('/');
//          }
//       } catch (error) {
//          console.log('User is not logged in');
//       }
//    };

//    const getSession = async () => {
//       try {
//          const session = await Auth.currentSession();
//          console.log(session);
//          console.log(session.getIdToken().getJwtToken()); // ID Token
//          console.log(session.getAccessToken().getJwtToken()); // Access Token
//          console.log(session.getRefreshToken().getToken()); // Refresh Token
//       } catch (error) {
//          console.error('Error getting current user session:', error);
//       }
//    };

//    const handleSignIn = async () => {
//       try {
//          const provider = 'Microsoft';
//          await Auth.federatedSignIn({ customProvider: provider });
//          await getSession();
//       } catch (error) {
//          console.error('Error signing in:', error);
//       }
//    };

//    // Use Effects
//    useEffect(() => {
//       checkUser();
//    }, []);

//    return (
//       <section className='loginContainer'>
//          <div className='row'>
//             <div className='loginForm'>
//                <h3>Welcome!</h3>

//                <p>Please, proceed to login with your Business Microsoft credentials.</p>

//                <div className='login' onClick={handleSignIn}>
//                   <div className='windowsLogo'>
//                      <img src={require('../../../../img/WindowsLogo.png')} alt='windows logo' />
//                   </div>

//                   <h4>Continue with Microsoft</h4>
//                </div>
//             </div>
//          </div>
//       </section>
//    );
// };
