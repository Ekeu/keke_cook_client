import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MenuIcon } from '@heroicons/react/outline';
import { Dialog } from '@headlessui/react';
import { useForm } from 'react-hook-form';

import FormInput from '../form-input/form-input.component.jsx';
import CustomButton from '../custom-button/custom-button.component.jsx';

import { createCategory } from '../../redux/reducers/category/category.actions';

const CategoryForm = ({ cancel, cancelButtonRef }) => {
  const dispatch = useDispatch();
  const categoryCreate = useSelector((state) => state.categoryCreate);
  const { loading: loadingCreate } = categoryCreate;
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = handleSubmit(async ({ categoryName }) => {
    dispatch(createCategory(categoryName));
    setValue('categoryName', '');
  });

  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          <div className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-gray-100'>
            <MenuIcon
              className='h-6 w-6 text-blue-gray-600'
              aria-hidden='true'
            />
          </div>
          <div className='mt-3 text-center sm:mt-5'>
            <Dialog.Title
              as='h3'
              className='text-lg leading-6 font-hind text-tight font-medium text-blue-gray-800'
            >
              Saisissez le nom de la catégorie
            </Dialog.Title>
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
          </div>
        </div>
        <div className='mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense'>
          <CustomButton
            type='submit'
            loading={loadingCreate}
            loaderHeight={'h-4'}
            loaderWidth={'h-4'}
            customStyles='border border-transparent text-white bg-rose-600 hover:bg-rose-700 sm:col-start-2 sm:text-sm'
          >
            Enregistrer
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
      </form>
    </>
  );
};

export default CategoryForm;
