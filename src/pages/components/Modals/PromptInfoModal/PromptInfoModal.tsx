import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import CancelIcon from '@mui/icons-material/Cancel';

import { AudioPlayer } from '../../AudioPlayer/AudioPlayer';
import { postPrompt, postPromptAudio } from '../../../../helpers';

import '../Modals.scss';

export const PromptInfoModal = ({
   promptSelected,
   clearPromptSelected,
   closeModal,
   modalReload,
}: any) => {
   const [readOnly, setReadOnly] = useState<boolean>(true);
   const [hide, setHide] = useState<boolean>(false);
   const [isPlaying, setIsPlaying] = useState<boolean>(false);

   const { accessToken } = useSelector((state: any) => state.user);

   // Routing Data
   const [id, setId] = useState<string>('');
   const [name, setName] = useState<string>('');
   const [content, setContent] = useState<string>('');
   const [language, setLanguage] = useState<string>('');

   const [audioFile, setAudioFile] = useState<string>('');

   // Classes
   const modalClasses = classNames('modalBody', {
      hide: hide === true,
   });

   // Functions
   const enableInput = () => {
      setReadOnly(false);
   };

   const handledCloseModal = () => {
      setName(promptSelected.Name);
      setContent(promptSelected.Content);
      setIsPlaying(false);
      setLanguage(promptSelected.Language);

      setReadOnly(true);
      setHide(true);
      clearPromptSelected('');

      setTimeout(() => {
         closeModal(true);
      }, 100);

      setTimeout(() => {
         setHide(false);
      }, 2000);
   };

   const handleSubmit = async () => {
      if (accessToken && id && language && content) {
         try {
            await postPrompt(accessToken, id, language, content);
         } catch (err) {
            console.log(err);
         }
      } else {
         console.log(
            `Error: Missing required fields. Data: ${id},  ${language}, ${content}`
         );
      }

      handledCloseModal();
      modalReload(true);
   };

   const playPromptModal = async () => {
      const voice = 'Joanna';

      try {
         const blob = await postPromptAudio(accessToken, content, voice);

         if (blob) {
            const audioUrl = URL.createObjectURL(blob);
            setAudioFile(audioUrl);
         }
      } catch (error) {
         console.log(error);
      }
   };

   // Use Effects
   useEffect(() => {
      if (content) {
         playPromptModal();
      }
   }, [content]);

   useEffect(() => {
      if (typeof promptSelected === 'object' && promptSelected !== null) {
         setId(promptSelected[0].Id);
         setName(promptSelected[0].Name);
         setContent(promptSelected[0].Content);
         setLanguage(promptSelected[0].Language);
      }
   }, [promptSelected]);

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
                  <h3>{`${name} - ${language}`}</h3>
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
                     <label>Prompt Preview:</label>
                     <AudioPlayer
                        audioFile={audioFile}
                        closeModal={hide}
                        playing={isPlaying}
                        setPlaying={setIsPlaying}
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
