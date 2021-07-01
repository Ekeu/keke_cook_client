import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ReceiptTaxIcon, XIcon, TrashIcon } from '@heroicons/react/outline';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { CreditCardIcon } from '@heroicons/react/solid';

import { currencyFormatter } from '../../utils/functions';

import {
  listCartDetails,
  emptyUserCart,
} from '../../redux/reducers/cart/cart.actions';
import {
  CART_CREATE_RESET,
  CART_DETAILS_RESET,
  CART_RESET_PRODUCT
} from '../../redux/reducers/cart/cart.types';
import {
  CREATE_ADDRESS_RESET,
  UPDATE_ADDRESS_RESET,
  DELETE_ADDRESS_RESET,
} from '../../redux/reducers/user/user.types';
import { getCurrentUser } from '../../redux/reducers/user/user.actions';

import CustomButton from '../../components/custom-button/custom-button.component';
import CheckoutProductCard from '../../components/cards/checkout-product-card.component';
import UserAddressCard from '../../components/cards/user-address-card.component';
import CheckoutCartDetailContainer from '../../components/checkout/checkout-cart-detail-container.component';
import CheckoutCartDetailInfo from '../../components/checkout/checkout-cart-detail-info.component';
import AddAddressCard from '../../components/cards/add-address-card.component';
import FormInput from '../../components/form-input/form-input.component';
import Modal from '../../components/modal/modal.component';
import AddAddessForm from '../../components/add-address-form/add-address-form.component';
import Notification from '../../components/notification/notification.component.jsx';

const Checkout = ({history}) => {
  const dispatch = useDispatch();

  const cancelButtonRef = useRef();
  const [openAddressForm, setOpenAddressForm] = useState(false);
  const [addressToUpdate, setAddressToUpdate] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addressToDelete, setAddressToDelete] = useState(null);
  const [deliveryFee, setDeliveryFee] = useState(0);

  const cartDetails = useSelector((state) => state.cartDetails);
  const { loading, error, success, cart } = cartDetails;
  const { products, cartTotal } = cart;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const emptyCart = useSelector((state) => state.emptyCart);
  const {
    loading: loadingEmptyCart,
    success: successEmptyCart,
    error: errorEmptyCart,
  } = emptyCart;
  const addUserAddress = useSelector((state) => state.addUserAddress);
  const {
    loading: loadingAddAdress,
    success: successAddAddress,
    error: errorAddAddress,
  } = addUserAddress;
  const deleteUserAddress = useSelector((state) => state.deleteUserAddress);
  const { success: successDeleteAddress, error: errorDeleteAddress } =
    deleteUserAddress;
  const updateUserAddress = useSelector((state) => state.updateUserAddress);
  const { success: successUpdateUserAddress, error: errorUpdateUserAddress } =
    updateUserAddress;

  const handleEmptyCart = () => {
    dispatch(emptyUserCart());
  };

  useEffect(() => {
    userInfo?.token && dispatch(listCartDetails(userInfo.token));
    if (successAddAddress) {
      dispatch({ type: CREATE_ADDRESS_RESET });
      setOpenAddressForm(false);
      toast(
        <Notification success headline="Ajout d'adresse.">
          Votre adresse à été enregistré avec succès.
        </Notification>
      );
      dispatch(getCurrentUser(userInfo?.token));
    }
    if (errorAddAddress) {
      toast(
        <Notification error headline="Ajout d'adresse.">
          Une erreur s'est produite veuillez réessayer.
        </Notification>
      );
    }
    if (successUpdateUserAddress) {
      dispatch({ type: UPDATE_ADDRESS_RESET });
      setOpenAddressForm(false);
      toast(
        <Notification success headline='Mise à jour'>
          Votre adresse à été mis à jour avec succès.
        </Notification>
      );
      dispatch(getCurrentUser(userInfo?.token));
    }
    if (errorUpdateUserAddress) {
      toast(
        <Notification error headline='Erreur de mise à jour'>
          Une erreur s'est produite veuillez réessayer.
        </Notification>
      );
    }
    if (successDeleteAddress) {
      dispatch({ type: DELETE_ADDRESS_RESET });
      toast(
        <Notification success headline='Mise à jour'>
          Votre adresse à été supprimé avec succès.
        </Notification>
      );
      dispatch(getCurrentUser(userInfo?.token));
    }
    if (errorDeleteAddress) {
      toast(
        <Notification error headline='Erreur de suppréssion'>
          Une erreur s'est produite veuillez réessayer.
        </Notification>
      );
    }
    if (successEmptyCart) {
      localStorage.removeItem('cart');
      dispatch({ type: CART_CREATE_RESET });
      dispatch({ type: CART_DETAILS_RESET });
      dispatch({ type: CART_RESET_PRODUCT });
      history.push('/products')
    }
    if (errorEmptyCart) {
      toast(
        <Notification error headline='Erreur'>
          Une erreur s'est produite veuillez réessayer.
        </Notification>
      );
    }
  }, [
    dispatch,
    history,
    userInfo?.token,
    successAddAddress,
    successUpdateUserAddress,
    successDeleteAddress,
    successEmptyCart,
    errorAddAddress,
    errorDeleteAddress,
    errorUpdateUserAddress,
    errorEmptyCart,
  ]);

  useEffect(() => {
    setSelectedAddress(userInfo?.addresses[0]);
    if (cartTotal <= 50) {
      setDeliveryFee(10);
    } else {
      setDeliveryFee(0);
    }
  }, [cartTotal, userInfo?.addresses]);

  return (
    <>
      <div className='min-h-screen bg-blue-gray-100'>
        <main className='py-10'>
          {/* Page header */}
          <div className='max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8'>
            <div className='flex items-center max-w-3xl'>
              <div>
                <h1 className='text-3xl font-bold font-hind text-blue-gray-800'>
                  Adresse de Livraison
                </h1>
                <p className='text-base font-medium font-hind text-blue-gray-500'>
                  Saisissez votre adresse de livraison pour connaître les
                  options de livraison et les délais. Les restrictions de
                  livraison appliquées peuvent nous contraindre à refuser votre
                  commande.
                </p>
              </div>
            </div>
            <div className='mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3'>
              <CustomButton
                type='button'
                onClick={handleEmptyCart}
                loading={loadingEmptyCart}
                addStyles={'max-w-max'}
                disabled={!products?.length}
                customStyles='inline-flex items-center border border-gray-300 text-gray-800 bg-white hover:bg-gray-50'
              >
                <TrashIcon className='-ml-1 mr-2 h-5 w-5' aria-hidden='true' />
                Vider mon panier
              </CustomButton>
              <CustomButton
                type='button'
                onClick={() => {}}
                loading={loading}
                addStyles='inline-flex items-center text-white hover:bg-rose-600 max-w-max'
              >
                <CreditCardIcon
                  className='-ml-1 mr-2 h-5 w-5'
                  aria-hidden='true'
                />
                Paiement
              </CustomButton>
            </div>
          </div>

          <div className='mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3'>
            <div className='space-y-6 lg:col-start-1 lg:col-span-2'>
              <section aria-labelledby='applicant-information-title'>
                <div className='max-w-lg mx-auto grid gap-5 lg:grid-cols-2 lg:max-w-none'>
                  {userInfo?.addresses?.map((address) => (
                    <UserAddressCard
                      address={address}
                      key={uuidv4()}
                      setAddressToUpdate={setAddressToUpdate}
                      setAddressToDelete={setAddressToDelete}
                      setOpenAddressForm={setOpenAddressForm}
                      setSelectedAddress={setSelectedAddress}
                      selectedAddress={selectedAddress}
                    />
                  ))}
                  <AddAddressCard onClick={() => setOpenAddressForm(true)} />
                </div>
              </section>
            </div>

            <section
              aria-labelledby='timeline-title'
              className='lg:col-start-3 lg:col-span-1 space-y-4'
            >
              <CheckoutCartDetailContainer headline={'Synthèse de la commande'}>
                <CheckoutCartDetailInfo
                  attribute={`${products?.length} ${
                    products?.length >= 2 ? 'Produits' : 'Produit'
                  }`}
                  value={currencyFormatter(cartTotal)}
                />
                <CheckoutCartDetailInfo
                  attribute={`Livraison`}
                  value={
                    deliveryFee === 0
                      ? 'Gratuit'
                      : currencyFormatter(deliveryFee)
                  }
                />
                <CheckoutCartDetailInfo
                  attribute={`Total`}
                  value={currencyFormatter(deliveryFee + cartTotal)}
                  valueStyles={'font-bold'}
                  attributeStyles={'font-bold'}
                />
              </CheckoutCartDetailContainer>

              <FormInput
                placeholder='Entrez Votre Code Promo'
                inputStyles='shadow-sm'
                TrailingIcon={ReceiptTaxIcon}
              />
              <div className='border-t border-blue-gray-200 pt-4'>
                <CheckoutCartDetailContainer
                  headline={'Détails de la commande'}
                >
                  <ul className='space-y-12 sm:divide-y sm:divide-blue-gray-200 sm:space-y-0 sm:-mt-2 lg:gap-x-8 lg:space-y-0'>
                    {products?.map((product) => (
                      <li key={product?.title} className='sm:py-6'>
                        <CheckoutProductCard product={product} />
                      </li>
                    ))}
                  </ul>
                </CheckoutCartDetailContainer>
              </div>
            </section>
          </div>
        </main>
      </div>
      <Modal
        open={openAddressForm}
        backgroundColor={'bg-blue-gray-500'}
        backgroundOpacity={'bg-opacity-60'}
        initialFocusRef={cancelButtonRef}
        onClose={() => {}}
      >
        <div className='hidden sm:block absolute top-0 right-0 pt-4 pr-4'>
          <button
            type='button'
            className='bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            onClick={() => {
              setOpenAddressForm(false);
              setAddressToUpdate(null);
            }}
          >
            <span className='sr-only'>Close</span>
            <XIcon className='h-6 w-6' aria-hidden='true' />
          </button>
        </div>
        <AddAddessForm
          loading={loadingAddAdress}
          addressToUpdate={addressToUpdate}
          addressToDelete={addressToDelete}
        />
      </Modal>
    </>
  );
};

export default Checkout;
