import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  ReceiptTaxIcon,
  XIcon,
  ArrowRightIcon,
} from '@heroicons/react/outline';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import { CreditCardIcon } from '@heroicons/react/solid';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';

import { currencyFormatter } from '../../utils/functions';

import { listCartDetails } from '../../redux/reducers/cart/cart.actions';
import {
  APPLY_COUPON_RESET,
  REMOVE_COUPON_RESET,
} from '../../redux/reducers/user/user.types';
import {
  applyCoupon,
  removeCoupon,
} from '../../redux/reducers/user/user.actions';

import SpinSVG from '../../components/spin-svg/spin-svg.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import CheckoutProductCard from '../../components/cards/checkout-product-card.component';
import CheckoutCartDetailContainer from '../../components/checkout/checkout-cart-detail-container.component';
import CheckoutCartDetailInfo from '../../components/checkout/checkout-cart-detail-info.component';
import FormInput from '../../components/form-input/form-input.component';
import Notification from '../../components/notification/notification.component.jsx';
import StripeCheckoutPaymentForm from '../../components/stripe-checkout-payment-form/stripe-checkout-payment-form.component.jsx';

import '../../styles/stripe.css';

const promise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const Payment = ({ history }) => {
  const dispatch = useDispatch();
  const [userCoupon, setUserCoupon] = useState('');
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [totalToPay, setTotalToPay] = useState(0);
  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const [sdkReady, setSdkReady] = useState(false);

  const cartDetails = useSelector((state) => state.cartDetails);
  const { loading, cart } = cartDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const applyUserCoupon = useSelector((state) => state.applyUserCoupon);
  const {
    loading: loadingApplyUserCoupon,
    success: successApplyUserCoupon,
    error: errorApplyUserCoupon,
  } = applyUserCoupon;
  const removeUserCoupon = useSelector((state) => state.removeUserCoupon);
  const {
    loading: loadingRemoveUserCoupon,
    success: successRemoveUserCoupon,
    error: errorRemoveUserCoupon,
  } = removeUserCoupon;

  const handleApplyDiscountCoupon = () => {
    dispatch(applyCoupon(userCoupon));
  };

  const handleRemoveDiscountCoupon = () => {
    dispatch(removeCoupon());
  };

  const payPalSuccessPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
  };

  const getTotalAmountFromServer = () => {
    if (cart?.appliedDiscount && cart?.discount && cart?.totalAfterDiscount) {
      return Number(cart?.totalAfterDiscount);
    } else {
      return Number(cart?.cartTotal);
    }
  };

  useEffect(() => {
    userInfo?.token && dispatch(listCartDetails(userInfo.token));
    if (successApplyUserCoupon) {
      toast(
        <Notification success headline='Code promo'>
          Votre code promo à bien été appliqué.
        </Notification>
      );
      dispatch(listCartDetails(userInfo.token));
      dispatch({ type: APPLY_COUPON_RESET });
    }
    if (successRemoveUserCoupon) {
      toast(
        <Notification success headline='Code promo'>
          Votre code promo à bien été retiré.
        </Notification>
      );
      dispatch(listCartDetails(userInfo.token));
      dispatch({ type: REMOVE_COUPON_RESET });
    }
    if (errorApplyUserCoupon) {
      toast(
        <Notification error headline='Erreur code promo'>
          {errorApplyUserCoupon}
        </Notification>
      );
    }
    if (errorRemoveUserCoupon) {
      toast(
        <Notification error headline='Erreur code promo'>
          {errorRemoveUserCoupon}
        </Notification>
      );
    }
  }, [
    dispatch,
    history,
    userInfo?.token,
    successApplyUserCoupon,
    successRemoveUserCoupon,
    errorApplyUserCoupon,
    errorRemoveUserCoupon,
  ]);

  useEffect(() => {
    const localStorageDeliveryAddress = localStorage.getItem('deliveryAddress');
    setDeliveryAddress(JSON.parse(localStorageDeliveryAddress));
    if (cart?.cartTotal <= 50) {
      setDeliveryFee(10);
    } else {
      setDeliveryFee(0);
    }
  }, [cart?.cartTotal]);

  useEffect(() => {
    if (cart.totalAfterDiscount) {
      setTotalToPay(deliveryFee + cart.totalAfterDiscount);
    } else {
      setTotalToPay(deliveryFee + cart?.cartTotal);
    }
  }, [cart?.cartTotal, deliveryFee, cart?.totalAfterDiscount]);

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/v1/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=EUR&disable-funding=credit,card`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!window.paypal) {
      addPayPalScript();
    } else {
      setSdkReady(true);
    }
  }, []);

  return (
    <>
      <div className='min-h-screen bg-blue-gray-100'>
        <main className='py-10'>
          {/* Page header */}
          <div className='max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8'>
            <div className='flex items-center max-w-3xl'>
              <div>
                <h1 className='text-3xl font-bold tracking-tight font-hind text-blue-gray-800'>
                  Paiement
                </h1>
                <p className='text-base font-medium font-hind text-blue-gray-500'>
                  Toutes les transactions sont sécurisées
                </p>
              </div>
            </div>
            <div className='mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3'>
              <CustomButton
                type='button'
                onClick={() => history.push('/me/payment')}
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
              <section aria-labelledby='payment-section'>
                <div className='bg-white shadow sm:rounded-lg'>
                  <div className='px-4 sm:px-6'>
                    <Elements stripe={promise}>
                      <StripeCheckoutPaymentForm />
                    </Elements>
                  </div>
                  <div className='border-t border-blue-gray-200 px-4 py-5 sm:px-6'>
                    <div className='max-w-sm mx-auto flex justify-center'>
                      {!sdkReady ? (
                        <SpinSVG size={'h-5 w-5'} color={'text-rose-500'} />
                      ) : (
                        <PayPalButton
                          amount={getTotalAmountFromServer()}
                          onSuccess={payPalSuccessPaymentHandler}
                          currency='EUR'
                        />
                      )}
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <section
              aria-labelledby='synthese-commande'
              className='lg:col-start-3 lg:col-span-1 space-y-4'
            >
              <CheckoutCartDetailContainer headline={'Synthèse de la commande'}>
                {cart?.totalAfterDiscount && (
                  <>
                    <CheckoutCartDetailInfo
                      attribute={`Prix d'origine`}
                      value={currencyFormatter(cart?.cartTotal)}
                    />
                    <CheckoutCartDetailInfo
                      attribute={`-${cart?.discount}%`}
                      value={`-${currencyFormatter(
                        (cart?.cartTotal * cart?.discount) / 100
                      )}`}
                    />
                  </>
                )}
                <CheckoutCartDetailInfo
                  attribute={`${cart?.products?.length} ${
                    cart?.products?.length >= 2 ? 'Produits' : 'Produit'
                  }`}
                  value={currencyFormatter(
                    cart?.totalAfterDiscount
                      ? cart.totalAfterDiscount
                      : cart?.cartTotal
                  )}
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
                  value={currencyFormatter(totalToPay)}
                  valueStyles={'font-bold'}
                  attributeStyles={'font-bold'}
                />
              </CheckoutCartDetailContainer>

              {cart?.totalAfterDiscount ? (
                <div
                  className={`relative bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6`}
                >
                  <div className='absolute top-0 right-0 pt-4 pr-4'>
                    <button
                      type='button'
                      className='bg-white rounded-md text-blue-gray-400 hover:text-blue-gray-500 focus:outline-none'
                      onClick={handleRemoveDiscountCoupon}
                    >
                      <span className='sr-only'>Supprimer</span>
                      <XIcon className='h-5 w-5' aria-hidden='true' />
                    </button>
                  </div>
                  <div className='flex space-x-2 align-middle'>
                    {loadingRemoveUserCoupon && (
                      <SpinSVG size={'h-5 w-5'} color={'text-rose-500'} />
                    )}
                    <h2
                      id='discount-title'
                      className={`text-md uppercase font-semibold font-hind ${
                        loadingRemoveUserCoupon
                          ? 'text-blue-gray-300'
                          : 'text-blue-gray-800'
                      }`}
                    >
                      {cart?.appliedDiscount}
                    </h2>
                  </div>
                </div>
              ) : (
                <>
                  <FormInput
                    id='coupon'
                    name='coupon'
                    type='text'
                    placeholder='Entrez Votre Code Promo'
                    inputStyles='shadow-sm uppercase'
                    autoComplete='off'
                    value={userCoupon}
                    handleChange={(e) => setUserCoupon(e.target.value)}
                    TrailingIcon={ReceiptTaxIcon}
                  />
                  {userCoupon.length > 0 && (
                    <CustomButton
                      type='button'
                      onClick={handleApplyDiscountCoupon}
                      loading={loadingApplyUserCoupon}
                      addStyles={
                        'inline-flex justify-between uppercase tracking-wider hover:bg-rose-600'
                      }
                    >
                      Appliquer
                      <ArrowRightIcon
                        className='-ml-1 mr-2 h-5 w-5'
                        aria-hidden='true'
                      />
                    </CustomButton>
                  )}
                </>
              )}
              <div className='border-t border-blue-gray-200 pt-4'>
                <CheckoutCartDetailContainer
                  headline={'Détails de la commande'}
                >
                  <ul className='space-y-12 sm:divide-y sm:divide-blue-gray-200 sm:space-y-0 sm:-mt-2 lg:gap-x-8 lg:space-y-0'>
                    {cart?.products?.map((product) => (
                      <li key={product?.title} className='sm:py-6'>
                        <CheckoutProductCard product={product} />
                      </li>
                    ))}
                  </ul>
                </CheckoutCartDetailContainer>
              </div>
              <div className='border-t border-blue-gray-200 pt-4'>
                <div
                  className={`relative bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6`}
                >
                  <h2
                    id='headline-address'
                    className='text-lg font-bold uppercase font-hind text-blue-gray-800'
                  >
                    Address de Livraison
                  </h2>
                  <div className='mt-2'>
                    <p className='text-md uppercase font-semibold font-hind text-blue-gray-800'>
                      {deliveryAddress?.first_name} {deliveryAddress?.last_name}
                    </p>
                    <span className='block mt-1'>
                      <p className='text-lg font-hind text-blue-gray-800'>
                        {deliveryAddress?.street_address}
                      </p>
                      {deliveryAddress?.street_address_cp && (
                        <p className='text-lg font-hind text-blue-gray-800'>
                          {deliveryAddress?.street_address_cp}
                        </p>
                      )}
                      <p className='text-lg font-hind text-blue-gray-800'>
                        {deliveryAddress?.city}, {deliveryAddress?.zip}
                      </p>
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

export default Payment;
