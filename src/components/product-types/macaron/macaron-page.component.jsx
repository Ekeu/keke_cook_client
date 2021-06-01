import React from 'react';

import Select from '../../select/select.component';

import { currencyFormatter } from '../../../utils/functions';

const MacaronPage = ({
  macaronShares,
  macaronShare,
  setMacaronShare,
  price,
  macaronShellColors,
  macaronShellColor,
  setMacaronShellColor,
  macaronFodders,
  macaronFodder,
  setMacaronFodder,
}) => {
  return (
    <>
      <div className='grid grid-cols-12 gap-x-12 gap-y-8'>
        <div className='col-span-6'>
          <Select
            options={macaronShares}
            value={macaronShare}
            onChange={setMacaronShare}
            label={'Nombre de Part'}
          />
        </div>
        <div className='col-span-6'>
          <div className='font-medium'>
            <span className='text-sm font-hind text-blue-gray-800'>Prix</span>
          </div>
          <div className='font-extrabold flex items-center'>
            <span className='text-3xl tracking-tight text-rose-500 font-poppins'>
              {currencyFormatter(price)}
            </span>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-12 gap-x-10 gap-y-8 pt-8'>
        <div className='col-span-6'>
          <Select
            options={macaronShellColors}
            value={macaronShellColor}
            onChange={setMacaronShellColor}
            label={'Couleur coque'}
          />
        </div>
        <div className='col-span-6'>
          <Select
            options={macaronFodders}
            value={macaronFodder}
            onChange={setMacaronFodder}
            label={'Fourrage'}
          />
        </div>
      </div>
    </>
  );
};

export default MacaronPage;
