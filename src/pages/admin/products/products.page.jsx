import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import UserNav from '../../../components/nav/user.nav.component';
import UserNavChildrenLayout from '../../../components/nav/user.nav.children.layout.component';
import AdminProductCard from '../../../components/cards/admin-product-card.component';
import Notification from '../../../components/notification/notification.component.jsx';
import Loader from '../../../components/loader/loader.component';
import Modal from '../../../components/modal/modal.component';
import DeleteAlert from '../../../components/delete-alert/delete-alert.component';

import {
  listProducts,
  deleteProduct,
} from '../../../redux/reducers/product/product.actions';

import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET,
} from '../../../redux/reducers/product/product.types';

import {
  ADMIN_NAVIGATION,
  PRODUCTS_HEADLINE,
  PRODUCTS_DESCRIPTION,
  PRODUCT_DELETE_ALERT_MESSAGE,
} from '../../../constants/admin.menu.constants';

const Products = ({ history }) => {
  const dispatch = useDispatch();

  //User Redux State
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //Products Redux State
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  //Product Delete Redux State
  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  //Component State
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [productToDelete, setProductToDelete] = useState('');

  const cancelButtonRef = useRef();

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    dispatch({ type: PRODUCT_DELETE_RESET });
    if (userInfo?.role !== 'admin') {
      history.push('/login');
    } else {
      dispatch(listProducts(10));
    }
    if (error) {
      toast(
        <Notification error headline='Erreur'>
          {error}
        </Notification>
      );
    }
    if (errorDelete) {
      toast(
        <Notification error headline='Erreur'>
          {errorDelete}
        </Notification>
      );
      setOpenDeleteAlert(false);
    }
    if (successDelete) {
      toast(
        <Notification success headline='Suppression réussie'>
          Le produit à été supprimé avec succès
        </Notification>
      );
      setOpenDeleteAlert(false);
    }
  }, [dispatch, history, userInfo, error, errorDelete, successDelete]);

  const cancelAlertAction = () => {
    setOpenDeleteAlert(false);
    setProductToDelete('');
  };

  const deleteOptionAction = (slug) => {
    setOpenDeleteAlert(true);
    setProductToDelete(slug);
  };

  const deleteHandler = () => {
    dispatch(deleteProduct(productToDelete));
  };

  return (
    <>
      <UserNav navigation={ADMIN_NAVIGATION}>
        <UserNavChildrenLayout
          headline={PRODUCTS_HEADLINE}
          description={PRODUCTS_DESCRIPTION}
        >
          <div>
            <div className='mx-auto py-6 max-w-7xl lg:py-12'>
              <div className='space-y-12'>
                {loading ? (
                  <Loader height='h-24' width='h-24' />
                ) : (
                  <ul className='space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8'>
                    {products.map((product) => (
                      <AdminProductCard
                        key={product._id}
                        product={product}
                        menuDeleteOptionAction={deleteOptionAction}
                      />
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </UserNavChildrenLayout>
      </UserNav>
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
          deleteAction={deleteHandler}
          headline={"Suppression d'un produit"}
          loadingDelete={loadingDelete}
        >
          {PRODUCT_DELETE_ALERT_MESSAGE}
        </DeleteAlert>
      </Modal>
    </>
  );
};

export default Products;
