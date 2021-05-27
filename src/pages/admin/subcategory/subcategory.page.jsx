import React, { useState, Fragment, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { PlusIcon as PlusIconOutline } from '@heroicons/react/outline';

import UserNav from '../../../components/nav/user.nav.component';
import UserNavChildrenLayout from '../../../components/nav/user.nav.children.layout.component';
import Notification from '../../../components/notification/notification.component.jsx';
import Modal from '../../../components/modal/modal.component';
import Loader from '../../../components/loader/loader.component';
import CategoryComponent from '../../../components/category/category.component';
import SubcategoryForm from '../../../components/subcategory-form/subcategory-form.component';
import DeleteAlert from '../../../components/delete-alert/delete-alert.component';
import SubcategoryUpdateForm from '../../../components/subcategory-update-form/subcategory-update-form.component';

import { getCategories } from '../../../redux/reducers/category/category.actions';
import {
  getSubcategory,
  getSubCategories,
  deleteSubcategory,
} from '../../../redux/reducers/subcategory/subcategory.actions';
import {
  SUBCATEGORY_CREATE_RESET,
  SUBCATEGORY_DELETE_RESET,
  SUBCATEGORY_DETAILS_RESET,
  SUBCATEGORY_UPDATE_RESET,
} from '../../../redux/reducers/subcategory/subcategory.types';

import {
  ADMIN_NAVIGATION,
  SUBCATEGORY_HEADLINE,
  SUBCATEGORY_DESCRIPTION,
  SUBCATEGORY_DELETE_ALERT_MESSAGE
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
  const subcategoryList = useSelector((state) => state.subcategoryList);
  const { loading, error, subcategories } = subcategoryList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const subcategoryDelete = useSelector((state) => state.subcategoryDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = subcategoryDelete;
  const subcategoryCreate = useSelector((state) => state.subcategoryCreate);
  const {
    error: errorCreate,
    success: successCreate,
    subcategory: createdSubcategory,
  } = subcategoryCreate;
  const subcategoryUpdate = useSelector((state) => state.subcategoryUpdate);
  const {
    error: errorUpdate,
    success: successUpdate,
    subcategory: updatedSubCategory,
  } = subcategoryUpdate;

  const [subCategoryToDelete, setSubCategoryToDelete] = useState('');
  const [open, setOpen] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const cancelButtonRef = useRef();

  useEffect(() => {
    dispatch({ type: SUBCATEGORY_CREATE_RESET });
    dispatch({ type: SUBCATEGORY_DELETE_RESET });
    dispatch({ type: SUBCATEGORY_DETAILS_RESET });
    dispatch(getCategories());
    dispatch(getSubCategories());
    if (userInfo && userInfo.role !== 'admin') {
      history.push('/');
    }
    if (successCreate) {
      toast(
        <Notification success headline='Création réussie'>
          La création de la sous catégorie {createdSubcategory?.name} à réussie
        </Notification>
      );
      setOpen(false);
    }
    if (successUpdate) {
      toast(
        <Notification success headline='Mise à jour réussie'>
          La mise à jour de la catégorie {updatedSubCategory?.name} à réussie
        </Notification>
      );
      dispatch({ type: SUBCATEGORY_UPDATE_RESET });
      setOpenUpdate(false);
    }
    if (successDelete) {
      toast(
        <Notification success headline='Suppréssion réussie'>
          La sous catégorie à été supprimée avec succès
        </Notification>
      );
      setOpenDeleteAlert(false);
    }
    if (errorCreate) {
      toast(
        <Notification error headline='Erreur de création'>
          {errorCreate}
        </Notification>
      );
      setOpen(false);
    }
    if (errorUpdate) {
      toast(
        <Notification error headline='Erreur de mise à jour'>
          {errorUpdate}
        </Notification>
      );
      setOpenUpdate(false);
    }
    if (errorDelete) {
      toast(
        <Notification error headline='Erreur de suppression'>
          {errorDelete}
        </Notification>
      );
      setOpenDeleteAlert(false);
    }
    if (error) {
      toast(
        <Notification error headline='Erreur de chargement'>
          {error}
        </Notification>
      );
    }
  }, [
    dispatch,
    createdSubcategory,
    successCreate,
    successUpdate,
    successDelete,
    errorDelete,
    errorCreate,
    errorUpdate,
    updatedSubCategory,
    error,
    history,
    userInfo,
  ]);

  const deleteOptionAction = (slug) => {
    setOpenDeleteAlert(true);
    setSubCategoryToDelete(slug);
  };
  const loadSubcategoryToUpdate = (slug) => {
    dispatch(getSubcategory(slug));
    setOpenUpdate(true);
  };
  const cancelAlertAction = () => {
    setOpenDeleteAlert(false);
    setSubCategoryToDelete('');
  };
  const handleDelete = () => {
    dispatch(deleteSubcategory(subCategoryToDelete));
  };

  return (
    <>
      <UserNav navigation={ADMIN_NAVIGATION}>
        <UserNavChildrenLayout
          headline={SUBCATEGORY_HEADLINE}
          description={SUBCATEGORY_DESCRIPTION}
        >
          <div className='flex flex-col justify-center py-12'>
            {loading && (
              <div className='mt-2 sm:mx-auto sm:w-full sm:max-w-md'>
                <div className='py-8 px-4 flex justify-center sm:px-10'>
                  <Loader height='h-24' width='h-24' />
                </div>
              </div>
            )}
            {subcategories?.length > 0 && (
              <div className='mt-1'>
                {subcategories.map((subcategory) => (
                  <span key={subcategory.category}>
                    <h2 className='text-blue-gray-800 text-xs font-medium font-hind uppercase tracking-wide'>
                      {subcategory.category}
                    </h2>
                    <ul className='grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 xl:grid-cols-4 my-3'>
                      {subcategory.subcategories.map((subcategory) => (
                        <CategoryComponent
                          key={subcategory._id}
                          category={subcategory}
                          options={options}
                          bgColor={'bg-rose-500'}
                          menuDeleteOptionAction={deleteOptionAction}
                          menuUpdateOptionAction={loadSubcategoryToUpdate}
                        />
                      ))}
                    </ul>
                  </span>
                ))}
              </div>
            )}

            {!loading && subcategories.length <= 0 ? (
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
                      <span className='sr-only'>
                        Ajouter une sous catégorie
                      </span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className='mt-2 sm:mx-auto sm:w-full sm:max-w-md'>
                <div className='py-8 px-4 flex justify-center sm:px-10'>
                  <button
                    type='button'
                    onClick={() => setOpen(true)}
                    className='bg-rose-600 p-1 rounded-full items-center justify-center text-white hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500'
                  >
                    <PlusIconOutline className='h-12 w-12' aria-hidden='true' />
                    <span className='sr-only'>Ajouter une sous catégorie</span>
                  </button>
                </div>
              </div>
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
        <SubcategoryForm
          cancel={() => setOpen(false)}
          cancelButtonRef={cancelButtonRef}
        />
      </Modal>
      <Modal
        open={openUpdate}
        backgroundColor={'bg-blue-gray-500'}
        backgroundOpacity={'bg-opacity-60'}
        initialFocusRef={cancelButtonRef}
        onClose={setOpenUpdate}
      >
        <SubcategoryUpdateForm
          cancel={() => setOpenUpdate(false)}
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
          cancel={cancelAlertAction}
          cancelButtonRef={cancelButtonRef}
          deleteAction={handleDelete}
          headline={"Suppression d'une sous catégorie"}
          loadingDelete={loadingDelete}
        >
          {SUBCATEGORY_DELETE_ALERT_MESSAGE}
        </DeleteAlert>
      </Modal>
    </>
  );
};

export default Category;
