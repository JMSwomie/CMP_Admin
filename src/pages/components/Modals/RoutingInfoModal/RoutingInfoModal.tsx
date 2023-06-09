import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import CancelIcon from '@mui/icons-material/Cancel';
import { FormControlLabel, Switch } from '@mui/material';

import { postRouting } from '../../../../helpers';

import '../Modals.scss';

export const RoutingInfoModal = ({
   routingSelected,
   clearRoutingSelected,
   closeModal,
   modalReload,
}: any) => {
   const [readOnly, setReadOnly] = useState<boolean>(true);
   const [hide, setHide] = useState<boolean>(false);

   const { accessToken } = useSelector((state: any) => state.user);

   // Routing Data
   const [name, setName] = useState<string>('');
   const [content, setContent] = useState<string>('');
   const [description, setDescription] = useState<string>('');
   const [language, setLanguage] = useState<string>('');
   const [recNum, setRecNum] = useState<number>();
   const [status, setStatus] = useState<boolean>(false);

   // Classes
   const modalClasses = classNames('modalBody', {
      hide: hide === true,
   });

   // Functions
   const enableInput = () => {
      setReadOnly(false);
   };

   const handledCloseModal = () => {
      setName(routingSelected.Name);
      setContent(routingSelected.Content);
      setDescription(routingSelected.Description);

      if (routingSelected.RolloutFlag === 'true') {
         setStatus(true);
      } else {
         setStatus(false);
      }

      setReadOnly(true);
      setHide(true);
      clearRoutingSelected('');

      setTimeout(() => {
         closeModal(true);
      }, 100);

      setTimeout(() => {
         setHide(false);
      }, 2000);
   };

   const handleSubmit = async () => {
      if (accessToken && name && recNum && language) {
         try {
            await postRouting(accessToken, name, recNum, language, content, status);
         } catch (err) {
            console.log(err);
         }
      } else {
         console.log(
            `Error: Missing required fields. Data: ${name}, ${recNum}, ${language}, ${status}`
         );
      }

      modalReload(true);
      handledCloseModal();
   };

   // Use Effects
   useEffect(() => {
      if (typeof routingSelected === 'object' && routingSelected !== null) {
         setName(routingSelected[0].Name);
         setContent(routingSelected[0].Content);
         setDescription(routingSelected[0].Description);
         setLanguage(routingSelected[0].Language);
         setRecNum(routingSelected[0].RecNum);

         if (routingSelected[0].RolloutFlag === 'true') {
            setStatus(true);
         }
      }
   }, [routingSelected]);

   return (
      <div className={modalClasses}>
         <div className='modalHeader'>
            <h2>Routing Prompt Management</h2>
            <div className='closeModal'>
               <CancelIcon
                  className='closeModalIcon'
                  onClick={handledCloseModal}
               />
            </div>
         </div>

         <div className='modalWrapper'>
            <div className='modalForms'>
               <div className='subTitle'>
                  <h3>{`${name} - ${description}`}</h3>
               </div>

               <form onSubmit={handleSubmit}>
                  <div className='formGroup'>
                     <label className='label1FormGroup' htmlFor='formGroup'>
                        <span>
                           Type the text to be read by the prompt generator:
                        </span>
                        <textarea
                           rows={5}
                           cols={5}
                           value={content}
                           maxLength={408}
                           onChange={(e) => setContent(e.target.value)}
                           disabled={readOnly}
                        />
                     </label>
                  </div>

                  <div className='formGroup2'>
                     <label>Routing Status:</label>
                     <FormControlLabel
                        control={<Switch checked={status} />}
                        label={status ? 'Active' : 'Inactive'}
                        onChange={() => setStatus(!status)}
                        disabled={readOnly}
                     />
                  </div>
               </form>
            </div>
         </div>

         <div className='modalFooter'>
            {readOnly ? (
               <>
                  <button className='btn btnActivated' onClick={enableInput}>
                     Edit
                  </button>
               </>
            ) : (
               <>
                  <button className='btn btnSubmit' onClick={handleSubmit}>
                     Update
                  </button>
               </>
            )}
         </div>
      </div>
   );
};
