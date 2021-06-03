import React from 'react';

import { Link } from 'react-router-dom';

const Badge = ({ url, name, color }) => {
  return (
    <Link
      to={url}
      className='capitalize relative inline-flex items-center rounded-full border border-blue-gray-300 px-3 py-0.5'
    >
      <div className='absolute flex-shrink-0 flex items-center justify-center'>
        <span
          className={`h-1.5 w-1.5 rounded-full ${color}`}
          aria-hidden='true'
        />
      </div>
      <div className='ml-3.5 text-sm font-medium text-blue-gray-800'>
        {name}
      </div>
    </Link>
  );
};

export default Badge;
