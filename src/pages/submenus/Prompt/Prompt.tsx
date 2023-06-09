import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AsyncSelect from 'react-select/async';
import classNames from 'classnames';

import {
   LoadingSpinner,
   PromptDataTable,
   PromptInfoModal,
} from '../../components';
import { useWindowsSize } from '../../../hooks';
import { PromptData, TableHeader } from '../../../interfaces';
import { errorAlert, tableRows } from '../../../services';
import { barSelect, setLogin } from '../../../store';

import './Prompt.scss';
import { getPrompt } from '../../../helpers';

const headers: TableHeader[] = [
   { key: 'Name', label: 'Name', width: 150 },
   { key: 'Language', label: 'Language', width: 150 },
   { key: 'Prompt', label: 'Preview Prompt', width: 150 },
   { key: 'Type', label: 'Type', width: 180 },
   { key: 'Actions', label: 'Actions', width: 90 },
];

export const Prompt = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const windowSize = useWindowsSize();

   const { accessToken } = useSelector((state: any) => state.user);

   const [promptData, setPromptData] = useState<PromptData[]>([]);

   const [promptModal, setPromptModal] = useState(true);
   const [promptSelected, setPromptSelected] = useState<PromptData[]>();
   const [promptSelectedId, setPromptSelectedId] = useState<string>('');
   const [errMsg, setErrMsg] = useState('');
   const [isLoading, setIsLoading] = useState(false);
   const [modalReload, setModalReload] = useState(false);
   const [totalRows, setTotalRows] = useState(10);

   // Values to Filtering
   const [language, setLanguage] = useState<string>();
   const [name, setName] = useState<string>();

   // Use Memo & Custom Classes
   const promptModalClasses = useMemo(
      () =>
         classNames('promptModal', {
            hide: promptModal === true,
         }),
      [promptModal]
   );

   // Filter Function
   const showingData = useMemo(() => {
      const fullData: PromptData[] = promptData;
      let filterData: PromptData[] = [];

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

      if (name) {
         filterData = filterData.filter(
            (row: any) =>
               row.Name.toLowerCase().indexOf(name.toLocaleLowerCase()) > -1
         );
      }

      return filterData;
   }, [promptData, language, name]);

   // Anonymous Functions
   const clearFilter = () => {
      setLanguage('');
      setName('');
   };

   const closeSystem = useCallback(async () => {
      setTimeout(() => {
         dispatch(barSelect('Prompt'));
         dispatch(setLogin(false));
         navigate('/login');
      }, 1000);
   }, [dispatch, navigate]);

   const fetchData = useCallback(async () => {
      setIsLoading(true);

      if (accessToken) {
         try {
            const resp: any = await getPrompt(accessToken);
            setPromptData(resp.output);
         } catch (error) {
            console.log(error);
         }

         setIsLoading(false);
      }

      setIsLoading(false);
   }, [closeSystem]);

   const handledLanguageOnChange = (selected: any) => {
      const resp = promptData.find(
         (i: PromptData) => i.Language === selected.label
      );

      if (resp) {
         setLanguage(resp.Language);
      }
   };

   const handledPromptOnChange = (selected: any) => {
      const resp = promptData.find((i: PromptData) => i.Name === selected.label);

      if (resp) {
         setName(resp.Name);
      }
   };

   const handleSelectedPrompt = useCallback(
      (Value: string) => {
         const [id, language] = Value.split('-');

         const prompt = promptData.filter(
            (item) =>
               item.Id.toLowerCase() === id.toLowerCase() &&
               item.Language.toLowerCase() === language.toLowerCase()
         );

         setPromptSelected(prompt);
         setPromptModal(false);
      },
      [promptData]
   );

   const languageOptions = useCallback(
      (value: any, callback: any) => {
         setTimeout(() => {
            const filtered: PromptData[] = promptData.filter(
               (promptData: PromptData) =>
                  promptData.Language.toLowerCase().includes(value.toLowerCase())
            );

            callback(filtered.map((i) => ({ label: i.Language })));
         }, 500);
      },
      [promptData]
   );

   const promptOptions = useCallback(
      (value: any, callback: any) => {
         setTimeout(() => {
            const filtered: PromptData[] = promptData.filter(
               (promptData: PromptData) =>
                  promptData.Name.toLowerCase().includes(value.toLowerCase())
            );

            callback(filtered.map((i) => ({ label: i.Name })));
         }, 500);
      },
      [promptData]
   );

   // UseEffects
   useEffect(() => {
      fetchData();
   }, [fetchData]);

   useEffect(() => {
      if (promptSelectedId.length > 0) {
         handleSelectedPrompt(promptSelectedId);
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
   }, [promptSelectedId, errMsg, modalReload, windowSize]);

   return (
      <>
         {isLoading ? (
            <LoadingSpinner />
         ) : (
            <div className='promptContainer'>
               <div className='headerPromptContainer'>
                  <div className='titlePromptWrapper'>
                     <h1 className='listPromptTitle'>Prompt Manager</h1>

                     <div className='titlePromptButtons'>
                        <button
                           className='btnSubmit'
                           onClickCapture={clearFilter}
                           title='Clear'>
                           <span className='buttonTitle'>Clear Filters</span>
                        </button>
                     </div>
                  </div>

                  <div className='promptSearchWrapper'>
                     <h2 className='subTitle'>Search Filters</h2>
                     <div className='searchInputs'>
                        <div className='labelContainer promptSearchLabel1'>
                           <label htmlFor='name'>Prompt Name:</label>
                        </div>

                        <div className='labelContainer promptSearchLabel2'>
                           <label htmlFor='name'>Language:</label>
                        </div>

                        <div className='inputContainer input1PromptFormGroup'>
                           <AsyncSelect
                              components={{
                                 IndicatorSeparator: () => null,
                              }}
                              loadOptions={promptOptions}
                              onChange={handledPromptOnChange}
                              value={name ? { label: `${name}` } : ''}
                           />
                        </div>

                        <div className='inputContainer input2PromptFormGroup'>
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

               <div className='promptTableContainer'>
                  <PromptDataTable
                     rows={showingData}
                     headers={headers}
                     totalRows={totalRows}
                     promptSelectedId={setPromptSelectedId}
                  />
               </div>

               <div className={promptModalClasses}>
                  <PromptInfoModal
                     promptSelected={promptSelected}
                     clearPromptSelected={setPromptSelectedId}
                     closeModal={setPromptModal}
                     modalReload={setModalReload}
                  />
               </div>
            </div>
         )}
      </>
   );
};
