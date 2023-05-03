import { useMsal } from '@azure/msal-react';

import './NavBar.scss';
import { useState, useEffect } from 'react';

export const NavBar = () => {
   const { instance } = useMsal();
   const [userName, setUserName] = useState<string | undefined>('');

   useEffect(() => {
      const currentAccount = instance.getActiveAccount();

      if (currentAccount) {
         setUserName(currentAccount.name);
      }
   }, [instance]);

   return (
      <div className='navbar'>
         <div className='wrapper'>
            <div className='title'>
               <h3>CMP - Connect Management Portal</h3>
            </div>
            <div className='userName'>
               <h3>{`Welcome ${userName}`}</h3>
            </div>
         </div>
      </div>
   );
};
