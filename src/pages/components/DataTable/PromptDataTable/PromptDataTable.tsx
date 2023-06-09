import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import EditIcon from '@mui/icons-material/Edit';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseIcon from '@mui/icons-material/Pause';

import { postPromptAudio } from '../../../../helpers';
import { PromptData, TableHeader } from '../../../../interfaces';

import '../DataTable.scss';

type PromptDataTableProps = {
   rows: PromptData[];
   headers: TableHeader[];
   totalRows: number;
   promptSelectedId: (Name: string) => void;
};

export const PromptDataTable = ({
   rows,
   headers,
   totalRows,
   promptSelectedId,
}: PromptDataTableProps) => {
   const { accessToken } = useSelector((state: any) => state.user);

   const [currentPage, setCurrentPage] = useState(0);
   const [pageNumber, setPageNumber] = useState(1);
   const [totalPages, setTotalPages] = useState(0);
   const [key, setKey] = useState<string>();

   const [audioFile, setAudioFile] = useState<string | undefined>();
   const [dataId, setDataId] = useState<number | undefined>();
   const [isPlaying, setIsPlaying] = useState<boolean>(false);
   const [rowPlaying, setRowPlaying] = useState<string | undefined>();

   // Functions
   const handleEdit = (e: React.MouseEvent, Id: string) => {
      if (Id === key) {
         promptSelectedId(Id);
      } else {
         setKey(Id);
         promptSelectedId(Id);
      }
   };

   const limitRows = () => {
      return rows.slice(currentPage, currentPage + totalRows);
   };

   const nextPage = () => {
      if (pageNumber < totalPages) {
         setCurrentPage(currentPage + totalRows);
         setPageNumber(pageNumber + 1);
      }
   };

   const playPrompt = async (RecNum: number, key: string | undefined) => {
      const voice = 'Joanna';

      const data: PromptData | undefined = rows.find(
         (row) => row.RecNum === RecNum
      );

      if (audioFile && rowPlaying && dataId) {
         stopPlayPrompt(dataId);
      }

      if (data) {
         const prompt = data.Content;

         try {
            const blob = await postPromptAudio(accessToken, prompt, voice);
            const audioUrl = URL.createObjectURL(blob);

            setAudioFile(audioUrl);
            setRowPlaying(key);
            setDataId(RecNum);
         } catch (error) {
            console.log(error);
         }
      }
   };

   const prevPage = () => {
      if (currentPage > 0) {
         setCurrentPage(currentPage - totalRows);
         setPageNumber(pageNumber - 1);
      } else if (currentPage === 0) {
         setPageNumber(1);
      }
   };

   const stopPlayPrompt = (RecNum: number) => {
      const audioPlayer = document.getElementById(
         `${RecNum}-audio`
      ) as HTMLAudioElement;

      audioPlayer.pause();
      audioPlayer.currentTime = 0;
      setAudioFile(undefined);
      setDataId(undefined);
      setIsPlaying(false);
      setRowPlaying(undefined);
   };

   const totalPage = () => {
      setCurrentPage(0);
      setPageNumber(1);

      const pages = Math.round(rows.length / totalRows);
      const rest = rows.length - pages * totalRows;

      if (rest > 0) {
         setTotalPages(pages + 1);
      } else {
         setTotalPages(pages);
      }
   };

   const toggleActive = (e: React.MouseEvent, Id: string) => {
      switch (e.detail) {
         case 1:
            setKey(Id);
      }
   };

   // Use Effects
   useEffect(() => {
      if (audioFile && rowPlaying) {
         const audioPlayer = document.getElementById(
            `${dataId}-audio`
         ) as HTMLAudioElement;

         audioPlayer.src = audioFile;

         // Play the audio
         audioPlayer.play();
         setIsPlaying(true);

         // Stop the audio
         audioPlayer.addEventListener('ended', () => {
            audioPlayer.pause();
            audioPlayer.currentTime = 0;
            setAudioFile(undefined);
            setDataId(undefined);
            setIsPlaying(false);
            setRowPlaying(undefined);
         });
      }
   }, [audioFile, rowPlaying]);

   useEffect(() => {
      totalPage();
   }, [rows]);

   useEffect(() => {
      totalPage();
   }, [totalRows]);

   return (
      <div className='dataTable'>
         <div className='tableContainer'>
            <div className='tableWrapper'>
               <table cellSpacing={3}>
                  <thead>
                     <tr className='tableHead'>
                        {headers[0] &&
                           headers.map(({ key, label, width }: TableHeader) => {
                              return (
                                 <th
                                    key={key}
                                    style={{ width: width }}>{`${label} `}</th>
                              );
                           })}
                     </tr>
                  </thead>
                  <tbody>
                     {rows[0] &&
                        limitRows().map(
                           ({
                              Id,
                              Name,
                              Language,
                              Type,
                              RecNum,
                           }: PromptData) => {
                              return (
                                 <tr
                                    key={`${Id}-${Language}`}
                                    className={`tableRow ${
                                       `${Id}-${Language}` === key
                                          ? 'active'
                                          : ''
                                    }`}
                                    onClick={(e) =>
                                       toggleActive(e, `${Id}-${Language}`)
                                    }>
                                    <td style={{ textAlign: 'center' }}>
                                       {Name}
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                       {Language}
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                       <audio id={`${RecNum}-audio`}></audio>
                                       {isPlaying &&
                                       `${Id}-${Language}` === rowPlaying ? (
                                          <PauseIcon
                                             className='icon'
                                             onClick={() =>
                                                stopPlayPrompt(RecNum)
                                             }
                                          />
                                       ) : (
                                          <PlayCircleIcon
                                             className='icon'
                                             onClick={() =>
                                                playPrompt(
                                                   RecNum,
                                                   `${Id}-${Language}`
                                                )
                                             }
                                          />
                                       )}
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                       {Type}
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                       <EditIcon
                                          className='icon'
                                          onClick={(e) =>
                                             handleEdit(e, `${Id}-${Language}`)
                                          }
                                       />
                                    </td>
                                 </tr>
                              );
                           }
                        )}
                  </tbody>
               </table>
            </div>
         </div>
         <div className='tableFooter'>
            <div className='buttonTable' onClick={() => prevPage()}>
               <p>
                  {`< `}
                  <span>Previous</span>
               </p>
            </div>
            <p>
               <strong>{`Page ${pageNumber} of ${totalPages}`}</strong>
            </p>
            <div className='buttonTable' onClick={() => nextPage()}>
               <p>
                  <span>Next</span>
                  {` >`}
               </p>
            </div>
         </div>
      </div>
   );
};
