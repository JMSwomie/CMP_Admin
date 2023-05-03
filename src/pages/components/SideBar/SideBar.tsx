import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import { useMsal } from '@azure/msal-react';

import { links } from '../../../data/dataTableSource';
import { barSelect } from '../../../store/slices';

import './SideBar.scss';

export const SideBar = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { instance } = useMsal();

   const { barShow } = useSelector((state: any) => state.sideBar);
   const { componentSelect } = useSelector((state: any) => state.sideBarSelect);

   // Use Memo & Custom Classes
   const wrapperClasses = classNames('sidebar', {
      hide: barShow === 'hide',
   });

   // Anonymous Functions
   const childrenSelected = (selected: any) => {
      dispatch(barSelect(selected));
      sessionStorage.setItem('selected', JSON.stringify(selected));
   };

   const closeSys = async () => {
      instance.logoutRedirect();

      setTimeout(() => {
         dispatch(barSelect('Prompt'));
         navigate('/login');
      }, 1000);
   };

   return (
      <div className={wrapperClasses}>
         <div className='center'>
            <ul>
               {links.map((item) => (
                  <div key={item.title}>
                     <p className='title'>{item.title}</p>

                     {item.links.map((link) => (
                        <li
                           key={link.name}
                           onClick={link.name === 'Logout' ? () => closeSys() : () => childrenSelected(link.name)}
                           className={`${componentSelect === link.name ? 'select' : ''}`}>
                           <div className='icon'>
                              {link.icon}
                              <span>{link.name}</span>
                           </div>
                        </li>
                     ))}
                  </div>
               ))}
            </ul>
         </div>
      </div>
   );
};
