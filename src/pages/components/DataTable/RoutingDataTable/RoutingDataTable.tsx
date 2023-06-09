import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { RoutingData, TableHeader } from '../../../../interfaces';

import '../DataTable.scss';

type RoutingDataTableProps = {
   rows: RoutingData[];
   headers: TableHeader[];
   totalRows: number;
   routingSelectedName: (Name: string) => void;
};

export const RoutingDataTable = ({
   rows,
   headers,
   totalRows,
   routingSelectedName,
}: RoutingDataTableProps) => {
   const [currentPage, setCurrentPage] = useState(0);
   const [pageNumber, setPageNumber] = useState(1);
   const [totalPages, setTotalPages] = useState(0);
   const [key, setKey] = useState<string>();

   // Functions
   const handleEdit = (e: React.MouseEvent, Value: string) => {
      if (Value === key) {
         routingSelectedName(Value);
      } else {
         setKey(Value);
         routingSelectedName(Value);
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

   const toggleActive = (e: React.MouseEvent, Value: string) => {
      switch (e.detail) {
         case 1:
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
                              Name,
                              Description,
                              Language,
                              RolloutFlag,
                           }: RoutingData) => {
                              return (
                                 <tr
                                    key={`${Name}-${Language}`}
                                    className={`tableRow ${
                                       `${Name}-${Language}` === key
                                          ? 'active'
                                          : ''
                                    }`}
                                    onClick={(e) =>
                                       toggleActive(e, `${Name}-${Language}`)
                                    }>
                                    <td style={{ textAlign: 'center' }}>
                                       {Name}
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                       {Description}
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                       {Language}
                                    </td>
                                    <td
                                       style={{
                                          display: 'flex',
                                          textAlign: 'center',
                                          justifyContent: 'center',
                                       }}>
                                       {RolloutFlag === 'true' ? (
                                          <span className='active'>Active</span>
                                       ) : (
                                          <span className='inactive'>
                                             Inactive
                                          </span>
                                       )}
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                       <EditIcon
                                          onClick={(e) =>
                                             handleEdit(e, `${Name}-${Language}`)
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
