import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClipboardCheckIcon } from '@heroicons/react/outline';

import { listMyOrders } from '../../redux/reducers/order/order.actions';

import { EMPTY_CART_RESET } from '../../redux/reducers/cart/cart.types';

import { HISTORY_DESCRIPTION } from '../../constants/user.menu.constants';

import Order from '../../components/order/order.component';
import UserNav from '../../components/nav/user.nav.component';
import CustomLink from '../../components/custom-link/custom-link.component';
import UserNavChildrenLayout from '../../components/nav/user.nav.children.layout.component';

const History = () => {
  const dispatch = useDispatch();

  const orderListUser = useSelector((state) => state.orderListUser);
  const { loading, orders, error } = orderListUser;
  const emptyCart = useSelector((state) => state.emptyCart);
  const { success: successEmptyCart } = emptyCart;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (successEmptyCart) {
      dispatch({ type: EMPTY_CART_RESET });
    }
    dispatch(listMyOrders());
  }, [dispatch, successEmptyCart, userInfo?.email]);

  return (
    <>
      <UserNav>
        <UserNavChildrenLayout
          headline={'Historique'}
          description={HISTORY_DESCRIPTION}
        >
          {orders?.length <= 0 ? (
            <div className='py-24 sm:py-32'>
              <div className='max-w-md mx-auto pl-4 pr-8 sm:max-w-lg sm:px-6 lg:max-w-7xl lg:px-8 space-y-10'>
                <h1 className='text-4xl leading-10 tracking-tight font-extrabold font-hind text-blue-gray-800 text-center sm:text-5xl sm:leading-none lg:text-6xl'>
                  Votre historique est vide!
                </h1>
                <div className='mx-auto flex items-center justify-center h-36 w-36 rounded-full bg-blue-gray-300'>
                  <ClipboardCheckIcon
                    className='h-24 w-24 text-blue-gray-600'
                    aria-hidden='true'
                  />
                </div>
                <div className='max-w-2xl mx-auto py-3 px-4 text-center sm:py-3 sm:px-6 lg:px-8'>
                  <CustomLink
                    url='/products'
                    type='link-button'
                    custom='mt-8 w-full bg-rose-500 py-3 px-5 text-base font-medium text-white hover:bg-rose-600 sm:w-auto'
                  >
                    Retour à la boutique
                  </CustomLink>
                </div>
              </div>
            </div>
          ) : (
            orders?.map((order) => <Order key={order?._id} order={order} address={order?.address} />)
          )}
        </UserNavChildrenLayout>
      </UserNav>
    </>
  );
};

export default History;
