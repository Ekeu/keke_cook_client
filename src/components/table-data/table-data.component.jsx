import React from 'react';

const TableData = ({ headers, action, children }) => {
  return (
    <div className='flex flex-col mt-6'>
      <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
          <div className='shadow overflow-hidden border-b border-blue-gray-200 sm:rounded-lg'>
            <table className='min-w-full divide-y divide-gray-200 font-hind'>
              <thead className='bg-blue-gray-50'>
                <tr>
                  {headers.map((header) => (
                    <th
                      key={header}
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-blue-gray-500 uppercase tracking-wider'
                    >
                      {header}
                    </th>
                  ))}
                  {action && (
                    <th scope='col' className='relative px-6 py-3'>
                      <span className='sr-only'>{action}</span>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>{children}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableData;
