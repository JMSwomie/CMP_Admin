import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import EditIcon from '@mui/icons-material/Edit';

import { PromptData, RootStateInterface, TableHeader } from '../../../../interfaces';

import '../DataTable.scss';

type PromptDataTableProps = {
   rows: PromptData[];
   headers: TableHeader[];
   totalRows: number;
   promptSelectedId: (Name: string) => void;
};

export const PromptDataTable = ({ rows, headers, totalRows, promptSelectedId }: PromptDataTableProps) => {

   const [currentPage, setCurrentPage] = useState(0);
   const [pageNumber, setPageNumber] = useState(1);
   const [totalPages, setTotalPages] = useState(0);
   const [key, setKey] = useState<string>();

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

   const prevPage = () => {
      if (currentPage > 0) {
         setCurrentPage(currentPage - totalRows);
         setPageNumber(pageNumber - 1);
      } else if (currentPage === 0) {
         setPageNumber(1);
      }
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
            if (Id === key) {
               promptSelectedId(Id);
            } else {
               setKey(Id);
            }
            break;

         case 2:
            promptSelectedId(Id);
            break;
      }
   };

   // Use Effects
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
                              return <th key={key} style={{ width: width }}>{`${label} `}</th>;
                           })}
                     </tr>
                  </thead>
                  <tbody>
                     {rows[0] &&
                        limitRows().map(({ Id, Name, Language, Type }: PromptData) => {
                           return (
                              <tr
                                 key={Id}
                                 className={`tableRow ${Id === key ? 'active' : ''}`}
                                 onClick={(e) => toggleActive(e, Id)}>
                                 <td style={{ textAlign: 'center' }}>{Name}</td>
                                 <td style={{ textAlign: 'center' }}>{Language}</td>
                                 <td style={{ textAlign: 'center' }}>Play button</td>
                                 <td style={{ textAlign: 'center' }}>{Type}</td>
                                 <td style={{ textAlign: 'center' }}>
                                    <EditIcon onClick={(e) => handleEdit(e, Id)} />
                                 </td>
                              </tr>
                           );
                        })}
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
