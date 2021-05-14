import React, { useState, Fragment, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { PlusIcon as PlusIconOutline } from '@heroicons/react/outline';

import UserNav from '../../../components/nav/user.nav.component';
import UserNavChildrenLayout from '../../../components/nav/user.nav.children.layout.component';
import Notification from '../../../components/notification/notification.component.jsx';
import Modal from '../../../components/modal/modal.component';
import CategoryComponent from '../../../components/category/category.component';
import CategoryForm from '../../../components/category-form/category-form.component';
import DeleteAlert from '../../../components/delete-alert/delete-alert.component';

import { getCategories } from '../../../redux/reducers/category/category.actions';
import { CATEGORY_CREATE_RESET } from '../../../redux/reducers/category/category.types';

import {
  ADMIN_NAVIGATION_COLORS,
  ADMIN_NAVIGATION,
  CATEGORY_HEADLINE,
  CATEGORY_DESCRIPTION,
} from '../../../constants/admin.menu.constants';

const options = [
  {
    url: '/',
    name: 'Modifier',
  },
  {
    url: '/',
    name: 'Supprimer',
  },
];

const Category = ({ history }) => {
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const categoryCreate = useSelector((state) => state.categoryCreate);
  const {
    error: errorCreate,
    success: successCreate,
    category: createdCategory,
  } = categoryCreate;

  const [categoryToDelete, setCategoryToDelete] = useState('');
  const [open, setOpen] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const cancelButtonRef = useRef();

  useEffect(() => {
    dispatch({ type: CATEGORY_CREATE_RESET });
    dispatch(getCategories());
    if (userInfo && userInfo.role !== 'admin') {
      history.push('/');
    }
    if (successCreate) {
      toast(
        <Notification success headline='Création réussie'>
          La création de la catégorie {createdCategory.name} à réussie
        </Notification>
      );
      setOpen(false);
    }
    if (errorCreate) {
      toast(
        <Notification error headline='Erreur!'>
          Une erreur s'est produite. Veuillez réessayez.
        </Notification>
      );
      setOpen(false);
    }
  }, [
    dispatch,
    createdCategory,
    successCreate,
    errorCreate,
    history,
    userInfo,
  ]);

  const deleteOptionAction = (slug) => {
    setOpenDeleteAlert(true);
    setCategoryToDelete(slug);
  };
  const cancselAlertAction = () => {
    setOpenDeleteAlert(false);
    setCategoryToDelete('');
  };
  const handleDelete = () => {};

  return (
    <>
      <UserNav
        navigation={ADMIN_NAVIGATION}
        navigationColors={ADMIN_NAVIGATION_COLORS}
      >
        <UserNavChildrenLayout
          headline={CATEGORY_HEADLINE}
          description={CATEGORY_DESCRIPTION}
        >
          <div className='flex flex-col justify-center py-12'>
            {categories?.length > 0 && (
              <div className='mt-1'>
                <ul className='grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 xl:grid-cols-4 mt-3'>
                  {categories.map((category) => (
                    <CategoryComponent
                      category={category}
                      options={options}
                      bgColor={'bg-rose-500'}
                      menuDeleteOptionAction={() => setOpenDeleteAlert(true)}
                    />
                  ))}
                  <li className='relative col-span-1 my-auto rounded-md'>
                    <button
                      type='button'
                      onClick={() => setOpen(true)}
                      className='bg-rose-600 p-1 rounded-full items-center justify-center text-white hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500'
                    >
                      <PlusIconOutline className='h-6 w-6' aria-hidden='true' />
                      <span className='sr-only'>Ajouter une catégorie</span>
                    </button>
                  </li>
                </ul>
              </div>
            )}
            {categories?.length <= 0 && (
              <>
                <div className='sm:mx-auto sm:w-full sm:max-w-md'>
                  <p className='text-center text-sm font-hind text-blue-gray-600'>
                    Vous n'avez aucune catégorie. Cliquez sur + pour ajouter une
                    catégorie.
                  </p>
                </div>
                <div className='mt-2 sm:mx-auto sm:w-full sm:max-w-md'>
                  <div className='py-8 px-4 flex justify-center sm:px-10'>
                    <button
                      type='button'
                      onClick={() => setOpen(true)}
                      className='bg-rose-600 p-1 rounded-full items-center justify-center text-white hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500'
                    >
                      <PlusIconOutline
                        className='h-12 w-12'
                        aria-hidden='true'
                      />
                      <span className='sr-only'>Ajouter une catégorie</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </UserNavChildrenLayout>
      </UserNav>
      <Modal
        open={open}
        backgroundColor={'bg-blue-gray-500'}
        backgroundOpacity={'bg-opacity-60'}
        initialFocusRef={cancelButtonRef}
        onClose={setOpen}
      >
        <CategoryForm
          cancel={() => setOpen(false)}
          cancelButtonRef={cancelButtonRef}
        />
      </Modal>
      <Modal
        open={openDeleteAlert}
        backgroundColor={'bg-blue-gray-500'}
        backgroundOpacity={'bg-opacity-60'}
        initialFocusRef={cancelButtonRef}
        onClose={setOpenDeleteAlert}
      >
        <DeleteAlert
          cancel={() => setOpenDeleteAlert(false)}
          cancelButtonRef={cancelButtonRef}
          deleteAction={handleDelete}
          headline={"Suppression d'une Catégorie"}
        >
          Êtes vous sûr de vouloir supprimer cette ccatégorie? Toutes les
          données liées à cette catégorie seront définitivement supprimées de
          nos servveurs. Cette action est irreversible.
        </DeleteAlert>
      </Modal>
    </>
  );
};

export default Category;
