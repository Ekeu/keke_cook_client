import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClockIcon } from '@heroicons/react/outline';
import { toast } from 'react-toastify';

import {
  listAllOrders,
  updateOrderStatus,
} from '../../redux/reducers/order/order.actions';

import UserNav from '../../components/nav/user.nav.component';
import Order from '../../components/order/order.component';
import SpinSVG from '../../components/spin-svg/spin-svg.component';
import SelectBrandedSupport from '../../components/select/select-branded-with-support.component';
import UserNavChildrenLayout from '../../components/nav/user.nav.children.layout.component';
import Notification from '../../components/notification/notification.component.jsx';

import {
  ADMIN_NAVIGATION,
  ADMIN_DASHBOARD_HEADLINE,
  ADMIN_DASHBOARD_DESCRIPTION,
  ORDER_STATUS_OPTIONS,
} from '../../constants/admin.menu.constants';

const AdminDashboard = () => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, orders, error } = orderList;
  const orderUpdateStatus = useSelector((state) => state.orderUpdateStatus);
  const {
    loading: loadingOrderUpdateStatus,
    success,
    error: errorOrderUpdateStatus,
  } = orderUpdateStatus;

  const handleStatusChange = (orderId, status) => {
    dispatch(updateOrderStatus(orderId, status.title));
  };

  useEffect(() => {
    dispatch(listAllOrders());
    if (errorOrderUpdateStatus) {
      toast(
        <Notification error headline={'Erreur'}>
          Une erreur s'est produite! Veuillez réessayer -{' '}
          {errorOrderUpdateStatus}
        </Notification>
      );
    }
    if (error) {
      toast(
        <Notification error headline={'Erreur'}>
          Une erreur de chargement s'est produite! Veuillez réessayer - {error}
        </Notification>
      );
    }
  }, [dispatch, success, errorOrderUpdateStatus, error]);

  return (
    <>
      <UserNav
        navigation={ADMIN_NAVIGATION}
        description={ADMIN_DASHBOARD_DESCRIPTION}
      >
        <UserNavChildrenLayout headline={ADMIN_DASHBOARD_HEADLINE}>
          {loading && (
            <div className='mt-2 sm:mx-auto sm:w-full sm:max-w-md'>
              <div className='py-8 px-4 flex justify-center sm:px-10'>
                <SpinSVG size={'h-24 w-24'} color={'text-rose-500'} />
              </div>
            </div>
          )}
          {orders?.length <= 0 ? (
            <div className='py-24 sm:py-32'>
              <div className='max-w-md mx-auto pl-4 pr-8 sm:max-w-lg sm:px-6 lg:max-w-7xl lg:px-8 space-y-10'>
                <h1 className='text-4xl leading-10 tracking-tight font-extrabold font-hind text-blue-gray-800 text-center sm:text-5xl sm:leading-none lg:text-6xl'>
                  Vous n'avez aucune commande pour l'instant!
                </h1>
                <div className='mx-auto flex items-center justify-center h-36 w-36 rounded-full bg-blue-gray-300'>
                  <ClockIcon
                    className='h-24 w-24 text-blue-gray-600'
                    aria-hidden='true'
                  />
                </div>
              </div>
            </div>
          ) : (
            orders?.map((order) => (
              <Order key={order?._id} order={order} address={order?.address}>
                <dt className='text-sm font-medium text-blue-gray-500'>
                  Statut de la commande
                </dt>
                <dd className='mt-1 text-sm text-blue-gray-800 sm:mt-0 sm:col-span-2'>
                  <SelectBrandedSupport
                    options={ORDER_STATUS_OPTIONS}
                    value={ORDER_STATUS_OPTIONS.find(
                      (status) => status.title === order?.orderStatus
                    )}
                    loading={loadingOrderUpdateStatus}
                    onChange={(status) =>
                      handleStatusChange(order?._id, status)
                    }
                  />
                </dd>
              </Order>
            ))
          )}
        </UserNavChildrenLayout>
      </UserNav>
    </>
  );
};

export default AdminDashboard;
