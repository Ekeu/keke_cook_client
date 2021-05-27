import React from 'react';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/outline';

import { Link } from 'react-router-dom';

import NoImage from '../../assets/images/no-product-image.jpg';

const AdminProductCard = ({ product, menuDeleteOptionAction }) => {
  const { images, title, price, slug } = product;
  return (
    <li>
      <div className='space-y-4'>
        <div className='aspect-w-3 aspect-h-2'>
          <img
            className='object-cover shadow-lg rounded-lg'
            src={images && images.length ? images[0].imageURL : NoImage}
            alt={title}
          />
        </div>

        <div className='space-y-2'>
          <div className='text-lg leading-6 font-medium space-y-1'>
            <h3 className='truncate font-hind text-blue-gray-800'>{title}</h3>
            <p className='text-blue-gray-500 font-poppins'>{price}</p>
          </div>
          <ul className='flex space-x-5'>
            <li>
              <Link to={`/admin/products/${slug}/edit`} >
                <PencilAltIcon
                  className='h-5 w-5 text-rose-400 hover:text-rose-500 cursor-pointer'
                  aria-hidden='true'
                />
              </Link>
            </li>
            <li>
              <TrashIcon
                className='h-5 w-5 text-rose-400 hover:text-rose-500 cursor-pointer'
                aria-hidden='true'
                onClick={() => menuDeleteOptionAction(slug)}
              />
            </li>
          </ul>
        </div>
      </div>
    </li>
  );
};

export default AdminProductCard;
