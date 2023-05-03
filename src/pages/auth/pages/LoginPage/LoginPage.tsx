import { useAccount, useMsal } from '@azure/msal-react';
import { useNavigate } from 'react-router-dom';

import './LoginPage.scss';
import { useEffect } from 'react';

export const LoginPage = () => {
   const navigate = useNavigate();
   const { instance } = useMsal();

   // Login Data
   // const [errMsg, setErrMsg] = useState('');
   // const [success, setSuccess] = useState(false);

   const accounts = instance.getAllAccounts();
   const account = useAccount(accounts[0] || {});

   // Anonymous Functions
   const handleSingIn = () => {
      instance.loginRedirect({
         scopes: ['user.read'],
      });

      // setSuccess(true);
   };

   useEffect(() => {
      if (account) {
         localStorage.setItem('user', JSON.stringify(account));
         navigate('/');
      }
   }, [account, navigate]);
   
   // useEffect(() => {
   //    if (success) {
   //       successAlert('Successful', 'Login in...');
   //    }

   //    setTimeout(() => {
   //       navigate('/');
   //    }, 100);
   // }, [success]);

   // useEffect(() => {
   //    if (errMsg) {
   //       errorAlert('Fail to Logging', errMsg);
   //       setErrMsg('');
   //    }
   // }, [errMsg]);

   return (
      <section className='loginContainer'>
         <div className='row'>
            <div className='loginForm'>
               <h3>Welcome!</h3>

               <p>Please, proceed to login with your Business Microsoft credentials.</p>

               <div className='login' onClick={handleSingIn}>
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
