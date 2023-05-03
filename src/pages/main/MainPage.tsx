import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';

import { useMsal } from '@azure/msal-react';

import { Footer, NavBar, SideBar } from '../components';
import { RootStateInterface } from '../../interfaces';
import { Prompt, Routing } from '../submenus';
import { errorAlert } from '../../services';
import { barSelect, sideBarMode, setLogin } from '../../store/slices';

import './MainPage.scss';

const selectRender = (sideBarSelect: string) => {
   switch (sideBarSelect) {
      case 'Prompt':
         return <Prompt />;

      case 'Routing':
         return <Routing />;

      default:
         return <Prompt />;
   }
};

export const MainPage = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { instance } = useMsal();

   const { barShow } = useSelector((state: any) => state.sideBar);
   const sideBarSelect = useSelector((state: RootStateInterface) => state.sideBarSelect.componentSelect);

   const [errMsg, setErrMsg] = useState('');


   const mainWrapper = useMemo(
      () =>
         classNames('mainWrapper', {
            hide: barShow === 'hide',
         }),
      [barShow]
   );

   // Anonymous Functions
   const changeBarMode = (barModeSelected: string) => {
      if (barModeSelected === 'hide') {
         localStorage.setItem('barShow', JSON.stringify(barModeSelected));
      } else if (barModeSelected === 'show') {
         localStorage.removeItem('barShow');
      }

      dispatch(sideBarMode(barModeSelected));
   };

   const closeSystem = useCallback(async () => {
      instance.logoutRedirect();

      setTimeout(() => {
         dispatch(barSelect('Prompt'));
         dispatch(setLogin(''));
         navigate('/login');
      }, 1000);
   }, [dispatch, navigate]);

   const checkInactivity = useCallback(() => {
      const expireTime: number = JSON.parse(localStorage.getItem('expireTime')!);

      if (expireTime > 0 && expireTime < Date.now()) {
         closeSystem();
      }
   }, [closeSystem]);

   const updateInactivity = useCallback(() => {
      const expireTime = Date.now() + 1200 * 1000; // Minutes * Millisec
      localStorage.setItem('expireTime', JSON.stringify(expireTime));
   }, []);

   // Use Effects
   useEffect(() => {
      checkInactivity();
      const interval = setInterval(checkInactivity, 20000); // Time to logout = min * 1000
      return () => clearInterval(interval);
   }, [checkInactivity]);

   useEffect(() => {
      updateInactivity();
      const events = ['click', 'keypress', 'scroll', 'mousemove'];
      events.forEach((e) => window.addEventListener(e, updateInactivity));
      return () => events.forEach((e) => window.removeEventListener(e, updateInactivity));
   }, [updateInactivity]);

   useEffect(() => {
      if (errMsg) {
         errorAlert('Fail to Logging', errMsg);
         setErrMsg('');
      }
   }, [errMsg]);

   return (
      <div className='main'>
         <div className='navContainer'>
            <NavBar />
         </div>

         <div className={mainWrapper}>
            <div className='sideContainer'>
               <SideBar />
            </div>
            <div className='sidebarControl' onClick={() => changeBarMode(`${barShow === 'show' ? 'hide' : 'show'}`)}>
               {barShow === 'show' ? <ArrowBackIosNew className='icon' /> : <ArrowForwardIos className='icon' />}
            </div>

            <div className='mainContainer'>
               <div className='content'>{selectRender(sideBarSelect)}</div>
               <div className='footer'>
                  <Footer />
               </div>
            </div>
         </div>
      </div>
   );
};
