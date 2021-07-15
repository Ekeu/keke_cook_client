import React, { useState, useEffect } from 'react';
import moment from 'moment';

import BadgeV2 from '../../components/badge/badge-v2.component';
import OrderedProductInfo from '../../components/ordered-product-info/ordered-product-info.component';

import { currencyFormatter } from '../../utils/functions';

const PaymentInfo = ({ order }) => {
  const [orderStatus, setOrderStatus] = useState(null);

  const checkOrderStatus = (status) => {
    if (status === 'Non traitée') {
      setOrderStatus({
        bgColor: 'bg-blue-gray-100',
        textColor: 'text-blue-gray-800',
      });
    }
    if (status === 'Pris en charge') {
      setOrderStatus({
        bgColor: 'bg-violet-100',
        textColor: 'text-violet-800',
      });
    }
    if (status === 'Expédiée') {
      setOrderStatus({
        bgColor: 'bg-cyan-100',
        textColor: 'text-cyan-800',
      });
    }
    if (status === 'Annulée') {
      setOrderStatus({
        bgColor: 'bg-red-100',
        textColor: 'text-red-800',
      });
    }
    if (status === 'Traitée') {
      setOrderStatus({
        bgColor: 'bg-teal-100',
        textColor: 'text-teal-800',
      });
    }
  };

  useEffect(() => {
    checkOrderStatus(order?.orderStatus);
  }, [order?.orderStatus]);

  return (
    <>
      <div className='px-4 py-4 sm:px-6 font-hind'>
        <div className='flex justify-between'>
          <div>
            <h3 className='text-lg leading-6 font-medium text-blue-gray-800'>
              N° Cmde :{' '}
              <span className='text-violet-500 font-poppins'>{order?._id}</span>
            </h3>
            <OrderedProductInfo label={'Montant'}>
              <BadgeV2
                text={currencyFormatter(order?.paymentIntent?.amount / 100)}
                bgColor={
                  order?.paymentIntent?.status === 'succeeded'
                    ? 'bg-green-100'
                    : 'bg-red-100'
                }
                textColor={
                  order?.paymentIntent?.status === 'succeeded'
                    ? 'text-green-800'
                    : 'text-red-800'
                }
              />
            </OrderedProductInfo>
            <OrderedProductInfo label={'Statut de la commande'}>
              <BadgeV2
                text={order?.orderStatus}
                bgColor={orderStatus?.bgColor}
                textColor={orderStatus?.textColor}
              />
            </OrderedProductInfo>
          </div>
          <div>
            <OrderedProductInfo label={'Comande passé le'}>
              <BadgeV2
                text={moment(order?.paymentIntent?.created * 1000).format('LL')}
                bgColor={'bg-blue-gray-100'}
                textColor={'text-blue-gray-800'}
              />
            </OrderedProductInfo>
            <OrderedProductInfo label={'Comande requise pour le'}>
              <BadgeV2
                text={moment(order?.paymentIntent?.requestedDate).format('LL')}
                bgColor={'bg-blue-gray-100'}
                textColor={'text-blue-gray-800'}
              />
            </OrderedProductInfo>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentInfo;
