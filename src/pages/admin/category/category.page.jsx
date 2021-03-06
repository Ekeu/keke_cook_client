import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { PlusIcon as PlusIconOutline } from '@heroicons/react/outline';

import UserNav from '../../../components/nav/user.nav.component';
import UserNavChildrenLayout from '../../../components/nav/user.nav.children.layout.component';
import Notification from '../../../components/notification/notification.component.jsx';
import Modal from '../../../components/modal/modal.component';
import Loader from '../../../components/loader/loader.component';
import CategoryComponent from '../../../components/category/category.component';
import CategoryForm from '../../../components/category-form/category-form.component';
import CategoryUpdateForm from '../../../components/category-update-form/category-update-form.component';
import DeleteAlert from '../../../components/delete-alert/delete-alert.component';

import {
  getCategory,
  getCategories,
  deleteCategory,
} from '../../../redux/reducers/category/category.actions';
import {
  CATEGORY_CREATE_RESET,
  CATEGORY_DELETE_RESET,
  CATEGORY_DETAILS_RESET,
  CATEGORY_UPDATE_RESET,
} from '../../../redux/reducers/category/category.types';

import {
  ADMIN_NAVIGATION,
  CATEGORY_HEADLINE,
  CATEGORY_DESCRIPTION,
  CATEGORY_DELETE_ALERT_MESSAGE,
} from '../../../constants/admin.menu.constants';

const Category = ({ history }) => {
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, categories } = categoryList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const categoryDelete = useSelector((state) => state.categoryDelete);
  const {
    error: errorDelete,
    success: successDelete,
    loading: loadingDelete,
  } = categoryDelete;
  const categoryCreate = useSelector((state) => state.categoryCreate);
  const {
    error: errorCreate,
    success: successCreate,
    category: createdCategory,
  } = categoryCreate;
  const categoryUpdate = useSelector((state) => state.categoryUpdate);
  const {
    error: errorUpdate,
    success: successUpdate,
    category: updatedCategory,
  } = categoryUpdate;

  const [categoryToDelete, setCategoryToDelete] = useState('');
  const [open, setOpen] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const cancelButtonRef = useRef();

  useEffect(() => {
    dispatch({ type: CATEGORY_CREATE_RESET });
    dispatch({ type: CATEGORY_DELETE_RESET });
    dispatch({ type: CATEGORY_DETAILS_RESET });
    dispatch(getCategories());
    if (userInfo && userInfo.role !== 'admin') {
      history.push('/');
    }
    if (successCreate) {
      toast(
        <Notification success headline='Cr??ation r??ussie'>
          La cr??ation de la cat??gorie {createdCategory.name} ?? r??ussie
        </Notification>
      );
      setOpen(false);
    }
    if (successUpdate) {
      toast(
        <Notification success headline='Mise ?? jour r??ussie'>
          La mise ?? jour de la cat??gorie {updatedCategory?.name} ?? r??ussie
        </Notification>
      );
      dispatch({ type: CATEGORY_UPDATE_RESET });
      setOpenUpdate(false);
    }
    if (successDelete) {
      toast(
        <Notification success headline='Suppr??ssion r??ussie'>
          La cat??gorie ?? ??t?? supprim??e avec succ??s
        </Notification>
      );
      setOpenDeleteAlert(false);
    }
    if (errorCreate) {
      toast(
        <Notification error headline='Erreur de cr??ation'>
          {errorCreate}
        </Notification>
      );
      setOpen(false);
    }
    if (errorUpdate) {
      toast(
        <Notification error headline='Erreur de mise ?? jour'>
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
    createdCategory,
    successCreate,
    successUpdate,
    successDelete,
    errorDelete,
    errorCreate,
    errorUpdate,
    updatedCategory,
    error,
    history,
    userInfo,
  ]);

  const deleteOptionAction = (slug) => {
    setOpenDeleteAlert(true);
    setCategoryToDelete(slug);
  };
  const loadCategoryToUpdate = (slug) => {
    dispatch(getCategory(slug));
    setOpenUpdate(true);
  };
  const cancelAlertAction = () => {
    setOpenDeleteAlert(false);
    setCategoryToDelete('');
  };
  const handleDelete = () => {
    dispatch(deleteCategory(categoryToDelete));
  };

  return (
    <>
      <UserNav navigation={ADMIN_NAVIGATION}>
        <UserNavChildrenLayout
          headline={CATEGORY_HEADLINE}
          description={CATEGORY_DESCRIPTION}
        >
          <div className='flex flex-col justify-center py-12'>
            {loading && (
              <div className='mt-2 sm:mx-auto sm:w-full sm:max-w-md'>
                <div className='py-8 px-4 flex justify-center sm:px-10'>
                  <Loader height='h-24' width='h-24' />
                </div>
              </div>
            )}
            {categories?.length > 0 && (
              <div className='mt-1'>
                <ul className='grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 xl:grid-cols-4 mt-3'>
                  {categories.map((category) => (
                    <CategoryComponent
                      key={category._id}
                      category={category}
                      bgColor={'bg-rose-500'}
                      menuDeleteOptionAction={deleteOptionAction}
                      menuUpdateOptionAction={loadCategoryToUpdate}
                    />
                  ))}
                  <li className='relative col-span-1 my-auto rounded-md'>
                    <button
                      type='button'
                      onClick={() => setOpen(true)}
                      className='bg-rose-600 p-1 rounded-full items-center justify-center text-white hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500'
                    >
                      <PlusIconOutline className='h-6 w-6' aria-hidden='true' />
                      <span className='sr-only'>Ajouter une cat??gorie</span>
                    </button>
                  </li>
                </ul>
              </div>
            )}
            {!loading && categories.length <= 0 && (
              <>
                <div className='sm:mx-auto sm:w-full sm:max-w-md'>
                  <p className='text-center text-sm font-hind text-blue-gray-600'>
                    Vous n'avez aucune cat??gorie. Cliquez sur + pour ajouter une
                    cat??gorie.
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
                      <span className='sr-only'>Ajouter une cat??gorie</span>
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
        open={openUpdate}
        backgroundColor={'bg-blue-gray-500'}
        backgroundOpacity={'bg-opacity-60'}
        initialFocusRef={cancelButtonRef}
        onClose={setOpenUpdate}
      >
        <CategoryUpdateForm
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
          headline={"Suppression d'une cat??gorie"}
          loadingDelete={loadingDelete}
        >
          {CATEGORY_DELETE_ALERT_MESSAGE}
        </DeleteAlert>
      </Modal>
    </>
  );
};

export default Category;
