import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RefreshIcon } from '@heroicons/react/outline';
import { Dialog } from '@headlessui/react';
import { useForm } from 'react-hook-form';

import FormInput from '../form-input/form-input.component.jsx';
import CustomButton from '../custom-button/custom-button.component.jsx';
import Loader from '../loader/loader.component.jsx';

import { updateCategory } from '../../redux/reducers/category/category.actions';

import { CATEGORY_DETAILS_RESET } from '../../redux/reducers/category/category.types';

const CategoryUpdateForm = ({ cancel, cancelButtonRef }) => {
  const dispatch = useDispatch();
  const categoryUpdate = useSelector((state) => state.categoryUpdate);
  const { loading: loadingUpdate } = categoryUpdate;
  const categoryDetails = useSelector((state) => state.categoryDetails);
  const { loading, category } = categoryDetails; //TODO: Destructure error and deal with it!
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    setValue('categoryName', category?.name);
  }, [setValue, category]);

  useEffect(() => {
    return () => dispatch({ type: CATEGORY_DETAILS_RESET });
  }, [dispatch]);

  const onSubmit = handleSubmit(async ({ categoryName }) => {
    dispatch(updateCategory(category?.slug, categoryName));
  });

  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          <div
            className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full ${
              loading ? 'bg-rose-50' : 'bg-blue-gray-100'
            }`}
          >
            {loading ? (
              <Loader />
            ) : (
              <RefreshIcon
                className='h-6 w-6 text-blue-gray-600'
                aria-hidden='true'
              />
            )}
          </div>
          <div className='mt-3 text-center sm:mt-5'>
            <Dialog.Title
              as='h3'
              className='text-lg leading-6 font-hind text-tight font-medium text-blue-gray-800'
            >
              {loading
                ? 'Veuillez patienter...'
                : 'Saisissez le nouveau nom de cette catégorie'}
            </Dialog.Title>
            {!loading && (
              <div className='mt-4'>
                <FormInput
                  id='categoryName'
                  name='categoryName'
                  type='text'
                  autoComplete='off'
                  register={register('categoryName', {
                    required: 'Saisissez le nom de la catégorie',
                    maxLength: {
                      value: 32,
                      message: 'Le nom de la catégorie est trop long (Max: 32)',
                    },
                    minLength: {
                      value: 3,
                      message: 'Le nom de la catégorie est trop court (Min: 3)',
                    },
                  })}
                  placeholder='Sweet Cake'
                  autoFocus
                  error={errors.categoryName?.message}
                />
              </div>
            )}
          </div>
        </div>
        {!loading && (
          <div className='mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense'>
            <CustomButton
              type='submit'
              loading={loadingUpdate}
              customStyles='border border-transparent text-white bg-rose-600 hover:bg-rose-700 sm:col-start-2 sm:text-sm'
            >
              Mettrà à jour
            </CustomButton>
            <CustomButton
              type='button'
              onClick={cancel}
              ref={cancelButtonRef}
              customStyles='border border-blue-gray-400 text-blue-gray-700 bg-white hover:bg-blue-gray-50 mt-3 sm:mt-0 sm:col-start-1 sm:text-sm'
            >
              Annuler
            </CustomButton>
          </div>
        )}
        {loading && (
          <button
            type='button'
            className='inline-flex justify-center w-full border-0 border-transparent rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white cursor-text'
          >
            😋😊😉
          </button>
        )}
      </form>
    </>
  );
};

export default CategoryUpdateForm;
