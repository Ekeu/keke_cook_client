import React from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/solid';
import { useDispatch, useSelector } from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';

import {
  getAddress,
  deleteAddress,
} from '../../redux/reducers/user/user.actions';

const UserAddressCard = ({
  address,
  selectedAddress,
  setSelectedAddress,
  setAddressToUpdate,
  setOpenAddressForm,
}) => {
  const {
    _id,
    first_name,
    last_name,
    city,
    zip,
    street_address,
    street_address_cp,
  } = address;

  const dispatch = useDispatch();

  const deleteUserAddress = useSelector((state) => state.deleteUserAddress);
  const { loading } = deleteUserAddress;

  const handleAddressUpdate = (_id) => {
    dispatch(getAddress(_id));
    setAddressToUpdate(_id);
    setOpenAddressForm(true);
  };

  const handleDeleteAddress = (_id) => {
    dispatch(deleteAddress(_id));
  };

  const handleSelectedAddress = () => {
    setSelectedAddress(address);
    localStorage.setItem('deliveryAddress', JSON.stringify(address));
  };
  
  return (
    <div className='inline-block relative px-4 sm:px-0'>
      <div
        className={`flex flex-col ${
          selectedAddress?._id === _id && 'border border-violet-500'
        } rounded-lg shadow-sm overflow-hidden h-full`}
      >
        <div
          className='flex-1 bg-white p-6 flex flex-col justify-between cursor-pointer'
          onClick={handleSelectedAddress}
        >
          <div className='flex-1'>
            <p className='text-md uppercase font-semibold font-hind text-blue-gray-800'>
              {first_name} {last_name}
            </p>
            <span className='block mt-2'>
              <p className='text-lg font-hind text-blue-gray-800'>
                {street_address}
              </p>
              {street_address_cp && (
                <p className='text-lg font-hind text-blue-gray-800'>
                  {street_address_cp}
                </p>
              )}
              <p className='text-lg font-hind text-blue-gray-800'>
                {city}, {zip}
              </p>
            </span>
          </div>
          <div className='mt-6 flex items-center'>
            <div className='space-y-2 mt-2'>
              <ul className='flex space-x-5'>
                <li>
                  <CustomButton
                    type='button'
                    onClick={() => handleAddressUpdate(_id)}
                    customStyles='inline-flex items-center border border-gray-300 text-gray-800 bg-white hover:bg-gray-50'
                  >
                    <PencilIcon
                      className='-ml-1 mr-2 h-5 w-5'
                      aria-hidden='true'
                    />
                    Modifier
                  </CustomButton>
                </li>
                <li>
                  <CustomButton
                    type='button'
                    onClick={() => handleDeleteAddress(_id)}
                    loading={loading}
                    addStyles='inline-flex items-center text-white hover:bg-rose-600'
                  >
                    <TrashIcon
                      className='-ml-1 mr-2 h-5 w-5'
                      aria-hidden='true'
                    />
                    Supprimer
                  </CustomButton>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {selectedAddress?._id === _id && (
        <span className='absolute top-0 right-4 sm:right-0 block h-4 w-4 transform -translate-y-1/2 translate-x-1/2 rounded-full ring-2 ring-white bg-violet-500' />
      )}
    </div>
  );
};

export default UserAddressCard;
