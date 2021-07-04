import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { TrashIcon } from '@heroicons/react/outline';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/solid';

import NoImage from '../../assets/images/no-product-image.png';

import { updateCart, removeFromCart } from '../../redux/reducers/cart/cart.actions';

import CartItemNumberLetterCake from './cart-item-number-letter-cake/cart-item-number-letter-cake.component';
import CartItemCupcake from './cart-item-cupcake/cart-item-cupcake.component';
import CartItemMacaron from './cart-item-macaron/cart-item-macaron.component';
import CartItemBrownie from './cart-item-brownie/cart-item-brownie.component';
import ProductQuantity from '../product-quantity/product-quantity.component';
import CartItemLabelValue from './cart-item-label-value/cart-item-label-vaue.component';
import { currencyFormatter } from '../../utils/functions';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(item?.quantity);

  useEffect(() => {
    if (quantity !== item?.quantity) {
      dispatch(updateCart(quantity, item?.c_id));
    }
  }, [dispatch, quantity, item?.quantity, item?.c_id]);

  const handleRemoveProductFromCart = () => {
    dispatch(removeFromCart(item?.c_id))
  };

  return (
    <div className='bg-white shadow sm:rounded-lg mb-3'>
      <div className='flex justify-between px-4 py-5 sm:px-6'>
        <div className='flex items-center space-x-5'>
          <div className='flex-shrink-0'>
            <div className='relative'>
              <img
                className='h-16 w-16 rounded-md object-cover'
                src={item.imageURL ? item.imageURL : NoImage}
                alt={item?.title}
              />
              <span
                className='absolute inset-0 shadow-inner rounded-md'
                aria-hidden='true'
              />
            </div>
          </div>
          <div>
            <h2
              id='applicant-information-title'
              className='text-lg leading-6 font-medium text-blue-gray-800'
            >
              {item?.title}
            </h2>
            <div className='mt-1 max-w-2xl text-sm flex'>
              <p className='inline-flex text-blue-gray-500 mr-3'>
                {item?.category}
              </p>
              {item?.shipping === 'Oui' && (
                <>
                  {' '}
                  {' | '}
                  <span className='ml-3 inline-flex items-center  px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800'>
                    Livraison Gratuite
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
        <button
          type='button'
          onClick={handleRemoveProductFromCart}
          className='inline-flex items-center p-1 border border-transparent rounded-full text-blue-gray-800 bg-white focus:outline-none'
        >
          <TrashIcon className='h-5 w-5' aria-hidden='true' />
        </button>
      </div>
      <div className='border-t border-blue-gray-200 px-4 py-5 sm:px-6'>
        <dl className='grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2'>
          <CartItemLabelValue
            label={'Quantité'}
            value={
              <ProductQuantity
                showLabel={false}
                quantity={quantity}
                setQuantity={setQuantity}
                iconLeft={
                  <ChevronLeftIcon className='h-4 w-4' aria-hidden='true' />
                }
                iconRight={
                  <ChevronRightIcon className='h-4 w-4' aria-hidden='true' />
                }
                btnStyles='bg-white text-blue-gray-800 py-2'
                containerStyles='mt-0'
              />
            }
          />
          <CartItemLabelValue
            label={'Prix'}
            value={currencyFormatter(item?.price)}
          />
          {(item?.productType === 'Number Cake' ||
            item?.productType === 'Letter Cake') && (
            <CartItemNumberLetterCake item={item} />
          )}
          {item?.productType === 'Cupcake' && <CartItemCupcake item={item} />}
          {item?.productType === 'Macaron' && <CartItemMacaron item={item} />}
          {item?.productType === 'Brownie' && <CartItemBrownie item={item} />}
        </dl>
      </div>
    </div>
  );
};

export default CartItem;
