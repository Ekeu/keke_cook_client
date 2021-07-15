import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { CheckIcon } from '@heroicons/react/outline';
import { toast } from 'react-toastify';

import { createOrder } from '../../redux/reducers/order/order.actions';
import { emptyUserCart } from '../../redux/reducers/cart/cart.actions';
import {
  CART_RESET_PRODUCT,
  CART_DETAILS_RESET
} from '../../redux/reducers/cart/cart.types';
import { ORDER_CREATE_RESET } from '../../redux/reducers/order/order.types';

import FormInput from '../form-input/form-input.component.jsx';
import Notification from '../notification/notification.component.jsx';

const StripeCheckoutPaymentForm = () => {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState(null);

  const stripe = useStripe();
  const elements = useElements();

  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const applyUserCoupon = useSelector((state) => state.applyUserCoupon);
  const { success: successApplyUserCoupon } = applyUserCoupon;
  const removeUserCoupon = useSelector((state) => state.removeUserCoupon);
  const { success: successRemoveUserCoupon } = removeUserCoupon;
  const orderCreate = useSelector((state) => state.orderCreate);
  const {
    error: errorOrderCreate,
    success: successOrderCreate,
  } = orderCreate;

  useEffect(() => {
    const getClientSecret = async () => {
      const res = await axios.post(
        '/api/v1/stripe/create-payment-intent',
        {},
        {
          headers: {
            Authorization: userInfo?.token,
          },
        }
      );
      setClientSecret(res.data.clientSecret);
    };
    getClientSecret();
    setAddress(JSON.parse(localStorage.getItem('deliveryAddress')))
  }, [userInfo?.token, successApplyUserCoupon, successRemoveUserCoupon]);

  useEffect(() => {
    if (successOrderCreate) {
      toast(
        <Notification success headline='Merci pour votre commande!'>
          Votre commande à été enregistré.
        </Notification>
      );
      dispatch(emptyUserCart());
      localStorage.removeItem('cart')
      dispatch({ type: CART_RESET_PRODUCT });
      dispatch({ type: CART_DETAILS_RESET });
      dispatch({ type: ORDER_CREATE_RESET });
      history.push('/me/account')
    }
    if (errorOrderCreate) {
      toast(
        <Notification error headline='Erreur!'>
          {errorOrderCreate}
        </Notification>
      );
    }
  }, [dispatch, history, successOrderCreate, errorOrderCreate]);

  const cardStyle = {
    style: {
      base: {
        color: '#1E293B',
        fontFamily: 'Hind, sans-serif',
        fontWeight: '500',
        fontSize: '14px',
        '::placeholder': {
          color: '#94A3B8',
        },
      },
      invalid: {
        color: '#E11D48',
        iconColor: '#E11D48',
      },
    },
  };

  const handleChange = async (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : '');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      receipt_email: email,
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      dispatch(createOrder(payload, address));
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  return (
    <form
      id='payment-form'
      className='stripe-form font-hind'
      onSubmit={handleSubmit}
    >
      <div
        className={`${succeeded ? 'pb-4 font-hind ' : 'pb-4 font-hind  hide'}`}
      >
        <div className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100'>
          <CheckIcon className='h-6 w-6 text-green-600' aria-hidden='true' />
        </div>
        <div className='mt-3 text-center sm:mt-5'>
          <h3 className='text-lg leading-6 font-medium text-blue-gray-800'>
            Paiement réussi.
          </h3>
          <div className='mt-2 inline-flex space-x-2 max-w-md'>
            <span className='text-sm text-blue-gray-500'>
              Ce paiement est disponible dans votre{' '}
              <Link
                to={'/me/account'}
                className='text-sm font-medium text-rose-500 hover:text-rose-600'
              >
                historique<span aria-hidden='true'> &rarr;</span>
              </Link>
            </span>
          </div>
        </div>
      </div>
      <FormInput
        id='email'
        name='email'
        type='email'
        label='email'
        labelText='Adresse E-mail'
        autoComplete='email'
        value={email}
        handleChange={(e) => setEmail(e.target.value)}
        placeholder='monks.hot@shopping.com'
        inputStyles='mb-2'
      />
      <CardElement
        id='card-element'
        options={cardStyle}
        onChange={handleChange}
      />
      <button
        className='stripe-button'
        disabled={processing || disabled || succeeded}
        id='submit'
      >
        <span id='button-text'>
          {processing ? (
            <div className='spinner' id='spinner'></div>
          ) : (
            'Passer la commande'
          )}
        </span>
      </button>
      {error && (
        <div className='mx-auto pt-6 px-4' role='alert'>
          <h2 className='text-md font-semibold text-rose-600 text-center'>
            {error}
          </h2>
        </div>
      )}
    </form>
  );
};

export default StripeCheckoutPaymentForm;
