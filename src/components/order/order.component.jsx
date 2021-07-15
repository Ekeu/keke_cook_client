import React from 'react';
import { PaperClipIcon } from '@heroicons/react/solid';
import { PDFDownloadLink } from '@react-pdf/renderer';

import PaymentInfo from '../payment-info/payment-info.component';
import TableData from '../table-data/table-data.component.jsx';
import Invoice from '../invoice/invoice.component';

import { currencyFormatter } from '../../utils/functions';

const Order = ({ order, address, children }) => {
  return (
    <>
      <div
        className='bg-white shadow sm:rounded-lg my-4'
        key={order?._id}
      >
        <PaymentInfo order={order} />
        <TableData headers={['Nom', 'Prix', 'Quantité']} containerStyles='px-4'>
          {order?.products?.map((product, productIdx) => (
            <tr
              key={product?.c_id}
              className={productIdx % 2 === 0 ? 'bg-white' : 'bg-blue-gray-50'}
            >
              <td className='px-6 py-4 whitespace-nowrap'>
                <div className='flex items-center'>
                  <div className='flex-shrink-0 h-10 w-10'>
                    <img
                      className='h-10 w-10 rounded-md object-cover'
                      src={product?.imageURL}
                      alt={product?.title}
                    />
                  </div>
                  <div className='ml-4'>
                    <div className='text-sm font-medium text-gray-900'>
                      {product?.title}
                    </div>
                    <div className='text-sm text-gray-500'>
                      {product?.category}
                    </div>
                  </div>
                </div>
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                {currencyFormatter(product?.price)}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                {product?.quantity}
              </td>
            </tr>
          ))}
        </TableData>

        <div className='px-4 py-5 sm:p-0'>
          <dl className='sm:divide-y sm:divide-gray-200'>
            <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-blue-gray-500'>Reçu</dt>
              <dd className='mt-1 text-sm text-blue-gray-800 sm:mt-0 sm:col-span-2'>
                <div className='border border-blue-gray-200 rounded-md divide-y divide-gray-200'>
                  <div className='pl-3 pr-4 py-3 flex items-center justify-between text-sm'>
                    <div className='w-0 flex-1 flex items-center'>
                      <PaperClipIcon
                        className='flex-shrink-0 h-5 w-5 text-blue-gray-400'
                        aria-hidden='true'
                      />
                      <span className='ml-2 flex-1 w-0 truncate'>
                        {order?._id}.pdf
                      </span>
                    </div>
                    <div className='ml-4 flex-shrink-0'>
                      <PDFDownloadLink
                        document={<Invoice order={order} address={address} />}
                        fileName={`keke-${order?._id}.pdf`}
                        className={
                          'font-medium text-rose-500 hover:text-rose-600 cursor-pointer'
                        }
                      >
                        Télécharger
                      </PDFDownloadLink>
                    </div>
                  </div>
                </div>
              </dd>
              {children}
            </div>
          </dl>
        </div>
      </div>
    </>
  );
};

export default Order;
