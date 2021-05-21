import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MenuAlt2Icon } from '@heroicons/react/outline';
import { useForm } from 'react-hook-form';

import FormInput from '../form-input/form-input.component.jsx';
import CustomButton from '../custom-button/custom-button.component.jsx';
import Select from '../select/select.component';

import { createSubcategory } from '../../redux/reducers/subcategory/subcategory.actions';

const SubcategoryForm = ({ cancel, cancelButtonRef }) => {
  const dispatch = useDispatch();
  const subcategoryCreate = useSelector((state) => state.subcategoryCreate);
  const { loading: loadingCreate } = subcategoryCreate;
  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;
  const [selected, setSelected] = useState(categories[0]);
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = handleSubmit(async ({ subcategoryName }) => {
    dispatch(createSubcategory(subcategoryName, selected._id));
    setValue('subcategoryName', '');
  });

  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          <div className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-gray-100'>
            <MenuAlt2Icon
              className='h-6 w-6 text-blue-gray-600'
              aria-hidden='true'
            />
          </div>
          <div className='mt-3 text-center sm:mt-5'>
            <Select
              options={categories}
              value={selected}
              onChange={setSelected}
              label={'Catégorie'}
            />
            <div className='mt-4'>
              <FormInput
                id='subcategoryName'
                name='subcategoryName'
                label='subcategoryName'
                labelText='Nom de la sous catégorie'
                type='text'
                autoComplete='off'
                register={register('subcategoryName', {
                  required: 'Saisissez le nom de la sous catégorie',
                  maxLength: {
                    value: 32,
                    message:
                      'Le nom de la sous catégorie est trop long (Max: 32)',
                  },
                  minLength: {
                    value: 3,
                    message:
                      'Le nom de la sous catégorie est trop court (Min: 3)',
                  },
                })}
                placeholder='Brownie'
                autoFocus
                error={errors.subcategoryName?.message}
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

export default SubcategoryForm;
