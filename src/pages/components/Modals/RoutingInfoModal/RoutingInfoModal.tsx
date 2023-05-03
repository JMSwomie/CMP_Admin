import { useEffect, useState } from 'react';
import classNames from 'classnames';

import CancelIcon from '@mui/icons-material/Cancel';
import { FormControlLabel, Switch } from '@mui/material';

// import { putRouting } from '../../../../../helpers';
// import { FormErrorInterface } from '../../../../../interfaces';
// import { errorAlert, getToken } from '../../../../../services';

import '../Modals.scss';

// const ActiveSwitch = styled(Switch)(({ theme }) => ({
//    '& .MuiSwitch-switchBase.Mui-checked': {
//      color: '#229936',
//      '&:hover': {
//        backgroundColor: alpha('#229936', theme.palette.action.hoverOpacity),
//      },
//    },
//    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
//      backgroundColor: pink[600],
//    },
//  }));


export const RoutingInfoModal = ({ routingSelected, clearRoutingSelected, closeModal, modalReload }: any) => {
   const [readOnly, setReadOnly] = useState<boolean>(true);
   const [hide, setHide] = useState<boolean>(false);

   // const [formErr, setFormErr] = useState<
   //   FormErrorInterface | undefined
   // >();

   // Routing Data
   const [name, setName] = useState<string>('');
   const [content, setContent] = useState<string>('');
   const [description, setDescription] = useState<string>('');
   const [status, setStatus] = useState<boolean>();

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

      if (routingSelected.RolloutFlag === 'True') {
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

   const handleSubmit = () => {
      // const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

      // if (!name) {
      //   setFormErr({
      //     err: 'The full name is required!!',
      //   });
      // } else if (!email) {
      //   setFormErr({
      //     err: 'The driver email is required!!',
      //   });
      // } else if (!EMAIL_REGEX.test(email)) {
      //   setFormErr({ err: 'This is not a valid Email!!' });
      // } else if (!phone) {
      //   setFormErr({
      //     err: 'The phone number is required!!',
      //   });
      // } else {
      // const token: string | null = getToken();

      // if (token) {
      //   putRouting(
      //     token,
      //     driverSelected.id,
      //     name,
      //     email,
      //     phone,
      //   );
      // } else {
      //   console.log('Error');
      // }

      // if (resetPass) {
      //   // TODO: Password Reset Api
      // }

      handledCloseModal();
      // modalReload(true);
      // }
   };

   // Use Effects
   useEffect(() => {
      if (typeof routingSelected === 'object' && routingSelected !== null) {
         setName(routingSelected[0].Name);
         setContent(routingSelected[0].Content);
         setDescription(routingSelected[0].Description);
         setStatus(routingSelected[0].RolloutFlag);
      }
   }, [routingSelected]);

   // useEffect(() => {
   //   if (formErr) {
   //     errorAlert('Fail to update routing', formErr.err);
   //   }
   // }, [formErr]);

   return (
      <div className={modalClasses}>
         <div className='modalHeader'>
            <h2>Routing Prompt Management</h2>
            <div className='closeModal'>
               <CancelIcon className='closeModalIcon' onClick={handledCloseModal} />
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
                        <span>Type the text to be read by the prompt generator:</span>
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
