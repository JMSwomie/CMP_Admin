import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AsyncSelect from 'react-select/async';
import classNames from 'classnames';

import {
   LoadingSpinner,
   RoutingDataTable,
   RoutingInfoModal,
} from '../../components';
import { getRouting, postRouting } from '../../../helpers';
import { useWindowsSize } from '../../../hooks';
import { RoutingData, TableHeader } from '../../../interfaces';
import { errorAlert, tableRows } from '../../../services';
import { barSelect, setLogin } from '../../../store';

import './Routing.scss';

const headers: TableHeader[] = [
   { key: 'Name', label: 'Routing Type', width: 150 },
   { key: 'Description', label: 'Description', width: 210 },
   { key: 'Language', label: 'Language', width: 150 },
   { key: 'RolloutFlag', label: 'Status', width: 180 },
   { key: 'Actions', label: 'Actions', width: 90 },
];

export const Routing = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const windowSize = useWindowsSize();

   const { accessToken } = useSelector((state: any) => state.user);

   const [routingData, setRoutingData] = useState<RoutingData[]>([]);

   const [bulkButton, setBulkButton] = useState(false);

   const [routingModal, setRoutingModal] = useState(true);
   const [routingSelected, setRoutingSelected] = useState<RoutingData[]>();
   const [routingSelectedName, setRoutingSelectedName] = useState<string>('');
   const [errMsg, setErrMsg] = useState('');
   const [isLoading, setIsLoading] = useState(false);
   const [modalReload, setModalReload] = useState(false);
   const [totalRows, setTotalRows] = useState(10);

   // Values to Filtering
   const [language, setLanguage] = useState<string>();
   const [routing, setRouting] = useState<string>();

   // Use Memo & Custom Classes
   const routingModalClasses = useMemo(
      () =>
         classNames('routingModal', {
            hide: routingModal === true,
         }),
      [routingModal]
   );

   // Filter Function
   const showingData = useMemo(() => {
      const fullData: RoutingData[] = routingData;
      let filterData: RoutingData[] = [];

      if (fullData.length !== filterData.length) {
         filterData = fullData;
      }

      if (language) {
         filterData = filterData.filter(
            (row: any) =>
               row.Language.toLowerCase().indexOf(language.toLocaleLowerCase()) >
               -1
         );
      }

      if (routing) {
         filterData = filterData.filter(
            (row: any) =>
               row.Name.toLowerCase().indexOf(routing.toLocaleLowerCase()) > -1
         );
      }

      return filterData;
   }, [routingData, routing, language]);

   // Anonymous Functions
   const activateRouting = async () => {
      setIsLoading(true);

      const promises = showingData.map((item: RoutingData) => {
         const name = item.Name;
         const language = item.Language;
         const recNum = item.RecNum;
         const content = item.Content;
         const status = true;

         console.log('Item:', item);

         return postRouting(
            accessToken,
            name,
            recNum,
            language,
            content,
            status
         );
      });

      try {
         await Promise.all(promises);
         fetchData();
      } catch (err) {
         console.error(err);
      }
   };

   const clearFilter = () => {
      setLanguage('');
      setRouting('');
   };

   const closeSystem = useCallback(async () => {
      setTimeout(() => {
         dispatch(barSelect('Prompt'));
         dispatch(setLogin(false));
         navigate('/');
      }, 1000);
   }, [dispatch, navigate]);

   const fetchData = useCallback(async () => {
      if (!isLoading) setIsLoading(true);

      if (accessToken) {
         const resp: any = await getRouting(accessToken);
         setRoutingData(resp.output);
         setIsLoading(false);
      }

      setIsLoading(false);
   }, [closeSystem]);

   const handledLanguageOnChange = (selected: any) => {
      const resp = routingData.find(
         (i: RoutingData) => i.Language === selected.label
      );

      if (resp) {
         setLanguage(resp.Language);
      }
   };

   const handledRoutingOnChange = (selected: any) => {
      const resp = routingData.find(
         (i: RoutingData) => i.Name === selected.label
      );

      if (resp) {
         setRouting(resp.Name);
      }
   };

   const handleSelectedRouting = useCallback(
      (Value: string) => {
         const [name, language] = Value.split('-');

         const routing = routingData.filter(
            (item) =>
               item.Name.toLowerCase() === name.toLowerCase() &&
               item.Language.toLowerCase() === language.toLowerCase()
         );

         setRoutingSelected(routing);
         setRoutingModal(false);
      },
      [routingData]
   );

   const inactiveRouting = async () => {
      setIsLoading(true);

      const promises = showingData.map((item: RoutingData) => {
         const name = item.Name;
         const language = item.Language;
         const recNum = item.RecNum;
         const content = item.Content;
         const status = false;

         return postRouting(
            accessToken,
            name,
            recNum,
            language,
            content,
            status
         );
      });

      try {
         await Promise.all(promises);
         fetchData();
      } catch (err) {
         console.error(err);
      }
   };

   const languageOptions = useCallback(
      (value: any, callback: any) => {
         setTimeout(() => {
            const filtered: RoutingData[] = routingData.filter(
               (routingData: RoutingData) =>
                  routingData.Language.toLowerCase().includes(
                     value.toLowerCase()
                  )
            );

            callback(filtered.map((i) => ({ label: i.Language })));
         }, 500);
      },
      [routingData]
   );

   const routingOptions = useCallback(
      (value: any, callback: any) => {
         setTimeout(() => {
            const filtered: RoutingData[] = routingData.filter(
               (routingData: RoutingData) =>
                  routingData.Name.toLowerCase().includes(value.toLowerCase())
            );

            callback(filtered.map((i) => ({ label: i.Name })));
         }, 500);
      },
      [routingData]
   );

   // UseEffects
   useEffect(() => {
      fetchData();
   }, [fetchData]);

   useEffect(() => {
      if (showingData.length === routingData.length) {
         setBulkButton(false);
      } else {
         setBulkButton(true);
      }
   }, [showingData]);

   useEffect(() => {
      if (routingSelectedName.length > 0) {
         handleSelectedRouting(routingSelectedName);
      }

      if (errMsg) {
         errorAlert('Fail to load users', errMsg);
         setErrMsg('');
      }

      if (modalReload) {
         setIsLoading(true);
         fetchData();
         setModalReload(false);
      }

      if (windowSize) {
         const resp = tableRows(windowSize.width, windowSize.height);
         setTotalRows(resp);
      }
   }, [routingSelectedName, errMsg, modalReload, windowSize]);

   return (
      <>
         {isLoading ? (
            <LoadingSpinner />
         ) : (
            <div className='routingContainer'>
               <div className='headerRoutingContainer'>
                  <div className='titleRoutingWrapper'>
                     <h1 className='listRoutingTitle'>Routing Manager</h1>

                     <div className='titleRoutingButtons'>
                        <button
                           className='btnSubmit'
                           onClickCapture={clearFilter}
                           title='Clear'>
                           <span className='buttonTitle'>Clear Filters</span>
                        </button>
                        <button
                           className={
                              bulkButton ? 'btnActivate' : 'btnActivate inactive'
                           }
                           disabled={!bulkButton}
                           onClick={activateRouting}
                           title='Activate'>
                           <span className='buttonTitle'>Activate</span>
                        </button>
                        <button
                           className={
                              bulkButton
                                 ? 'btnInactivate'
                                 : 'btnInactivate inactive'
                           }
                           disabled={!bulkButton}
                           onClick={inactiveRouting}
                           title='Inactive'>
                           <span className='buttonTitle'>Inactivated</span>
                        </button>
                     </div>
                  </div>

                  <div className='routingSearchWrapper'>
                     <h2 className='subTitle'>Search Filters</h2>
                     <div className='searchInputs'>
                        <div className='labelContainer routingSearchLabel1'>
                           <label htmlFor='name'>Routing Type:</label>
                        </div>

                        <div className='labelContainer routingSearchLabel2'>
                           <label htmlFor='name'>Language:</label>
                        </div>

                        <div className='inputContainer input1RoutingFormGroup'>
                           <AsyncSelect
                              components={{
                                 IndicatorSeparator: () => null,
                              }}
                              loadOptions={routingOptions}
                              onChange={handledRoutingOnChange}
                              value={routing ? { label: `${routing}` } : ''}
                           />
                        </div>

                        <div className='inputContainer input2RoutingFormGroup'>
                           <AsyncSelect
                              components={{
                                 IndicatorSeparator: () => null,
                              }}
                              loadOptions={languageOptions}
                              onChange={handledLanguageOnChange}
                              value={language ? { label: `${language}` } : ''}
                           />
                        </div>
                     </div>
                  </div>
               </div>

               <div className='routingTableContainer'>
                  <RoutingDataTable
                     rows={showingData}
                     headers={headers}
                     totalRows={totalRows}
                     routingSelectedName={setRoutingSelectedName}
                  />
               </div>

               <div className={routingModalClasses}>
                  <RoutingInfoModal
                     routingSelected={routingSelected}
                     clearRoutingSelected={setRoutingSelectedName}
                     closeModal={setRoutingModal}
                     modalReload={setModalReload}
                  />
               </div>
            </div>
         )}
      </>
   );
};
