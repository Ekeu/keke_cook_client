import React, { useState, useEffect, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import { useSelector, useDispatch } from 'react-redux';
import { TagIcon, ArrowRightIcon } from '@heroicons/react/outline';
import { CalendarIcon } from '@heroicons/react/solid';
import { registerLocale } from 'react-datepicker';
import { toast } from 'react-toastify';
import moment from 'moment';
import 'moment/locale/fr';
import fr from 'date-fns/locale/fr';

import { currencyFormatter } from '../../utils/functions';

import { createCart } from '../../redux/reducers/cart/cart.actions';
import { CART_CREATE_RESET } from '../../redux/reducers/cart/cart.types';

import { ReactComponent as EmptyCart } from '../../assets/images/empty-cart.svg';

import CustomLink from '../../components/custom-link/custom-link.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import CartItem from '../../components/cart-item/cart-item.component';
import Notification from '../../components/notification/notification.component.jsx';

moment.locale('fr');
registerLocale('fr', fr);

const daysNeeded = [0, 6];

const isThisInFuture = (targetDayNum) => {
  const todayNum = moment().isoWeekday();
  if (todayNum <= targetDayNum) {
    return moment().isoWeekday(targetDayNum);
  }
  return false;
};

const findNextInstanceInDaysNeededArray = (daysNeeded) => {
  const checks = daysNeeded.map(isThisInFuture);
  const thisWeek = checks.find((sample) => sample instanceof moment);
  return thisWeek || moment().add(1, 'weeks').isoWeekday(daysNeeded[0]);
};
const totalPriceCallBack = (acc, cv) => {
  return acc + cv.price * cv.quantity;
};

const isWeekendDay = (date) => {
  const day = moment(date).day();
  return day === 0 || day === 6;
};

const DateCustomInput = forwardRef(({ value, onClick }, ref) => (
  <CustomButton
    addStyles='inline-flex items-center'
    onClick={onClick}
    ref={ref}
  >
    <CalendarIcon className='-ml-1 mr-3 h-5 w-5' aria-hidden='true' />
    {moment(value, 'MM/DD/YY').format('L')}
  </CustomButton>
));

const Cart = ({ history }) => {
  const [startDate, setStartDate] = useState(
    findNextInstanceInDaysNeededArray(daysNeeded).toDate()
  );
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartProducts } = cart;
  const cartCreate = useSelector((state) => state.cartCreate);
  const { loading, error, success } = cartCreate;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleSaveCartToDatabase = () => {
    dispatch(createCart(cartProducts));
  };

  useEffect(() => {
    if (success) {
      toast(
        <Notification success headline='Panier Enregistré'>
          Votre panier à été enregistré avec succès
        </Notification>
      );
      history.push('/delivery');
    }
    if (error) {
      toast(
        <Notification error headline='Erreur'>
          {error}
        </Notification>
      );
    }
  }, [dispatch, history, success, error]);

  return (
    <div className='min-h-screen bg-blue-gray-100'>
      {!cartProducts.length ? (
        <main className='py-10'>
          <div className='relative overflow-hidden'>
            <div className='relative pt-6 pb-8 sm:pb-16'>
              <div className='mt-16 mx-auto px-4 sm:mt-24 sm:px-6'>
                <div className='text-center'>
                  <h1 className='text-4xl tracking-tight font-extrabold font-hind text-blue-gray-800 sm:text-5xl md:text-6xl'>
                    Votre panier est actuellement vide
                  </h1>
                </div>
              </div>
            </div>
            <div className='relative'>
              <div className='max-w-xs mx-auto px-4 sm:px-6'>
                <EmptyCart />
              </div>
            </div>
            <div className='max-w-2xl mx-auto py-16 px-4 text-center sm:py-20 sm:px-6 lg:px-8'>
              <CustomLink
                url='/products'
                type='link-button'
                custom='mt-8 w-full bg-rose-500 py-3 px-5 text-base font-medium text-white hover:bg-rose-600 sm:w-auto'
              >
                Retour à la boutique
              </CustomLink>
            </div>
          </div>
        </main>
      ) : (
        <main className='py-10'>
          {/* Page header */}
          <div className='max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8'>
            <div className='flex items-center space-x-5'>
              <div>
                <h1 className='text-3xl font-bold text-blue-gray-800 font-hind'>
                  Mon Panier
                </h1>
              </div>
            </div>
            <div className='mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3'>
              <span className='inline-flex items-center justify-center px-3 py-3 text-base font-medium font-hind'>
                Date de Retrait ou Livraison :
              </span>
              <DatePicker
                selected={startDate}
                locale='fr'
                onCalendarOpen={() =>
                  document
                    .querySelector('.react-datepicker__triangle')
                    .removeAttribute('class')
                }
                calendarClassName={'date-container'}
                onChange={(date) => setStartDate(date)}
                minDate={moment().toDate()}
                filterDate={isWeekendDay}
                customInput={<DateCustomInput />}
              />
            </div>
          </div>

          <div className='mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3'>
            <div className='space-y-6 lg:col-start-1 lg:col-span-2'>
              {/* Description list*/}
              <section aria-labelledby='applicant-information-title'>
                {cartProducts.map((product) => (
                  <CartItem key={product?.title} item={product} />
                ))}
              </section>
            </div>

            <section
              aria-labelledby='timeline-title'
              className='lg:col-start-3 lg:col-span-1'
            >
              <div className='bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6'>
                <h2
                  id='timeline-title'
                  className='text-lg font-hind uppercase font-medium text-blue-gray-800'
                >
                  Synthèse de la commande
                </h2>

                {/* Pre-order details */}
                <div className='mt-6 flow-root'>
                  <ul className='-mb-8'>
                    {cartProducts.map((product, productIdx) => (
                      <li key={product?.title}>
                        <div className='relative pb-8'>
                          {productIdx !== cartProducts.length - 1 ? (
                            <span
                              className='absolute top-4 left-4 -ml-px h-full w-0.5 bg-blue-gray-200'
                              aria-hidden='true'
                            />
                          ) : null}
                          <div className='relative flex space-x-3'>
                            <div>
                              <span
                                className={
                                  'bg-blue-gray-400 h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                                }
                              >
                                <TagIcon
                                  className='w-5 h-5 text-white'
                                  aria-hidden='true'
                                />
                              </span>
                            </div>
                            <div className='min-w-0 flex-1 pt-1.5 flex justify-between space-x-4'>
                              <div className='font-hind'>
                                <p className='text-sm text-blue-gray-500 truncate'>
                                  {product?.title}
                                  {' x '}
                                  <span className='font-medium text-blue-gray-800'>
                                    {product?.quantity}
                                  </span>
                                </p>
                              </div>
                              <div className='text-right text-sm whitespace-nowrap text-blue-gray-800 font-poppins'>
                                {currencyFormatter(
                                  product?.price * product?.quantity
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className='mt-6 border-t border-blue-gray-200 pt-4'>
                  <h2
                    id='total-price'
                    className='text-right text-lg font-poppins font-medium text-blue-gray-800 uppercase trackin-tight'
                  >
                    Total :{' '}
                    {currencyFormatter(
                      cartProducts.reduce(totalPriceCallBack, 0)
                    )}
                  </h2>
                </div>
                <div className='mt-6 flex flex-col justify-stretch'>
                  {userInfo?.token ? (
                    <CustomButton
                      type='button'
                      onClick={handleSaveCartToDatabase}
                      loading={loading}
                      addStyles={
                        'inline-flex justify-between uppercase tracking-wider hover:bg-rose-600'
                      }
                    >
                      Commander
                      <ArrowRightIcon
                        className='ml-3 -mr-1 h-5 w-5'
                        aria-hidden='true'
                      />
                    </CustomButton>
                  ) : (
                    <CustomLink
                      type='link-button'
                      url={{
                        pathname: '/login',
                        state: { from: 'cart' },
                      }}
                      custom={
                        'inline-flex justify-between px-4 py-2 border border-transparent text-base font-hind font-medium uppercase tracking-wider rounded-md shadow-sm text-white bg-rose-500 hover:bg-rose-600 focus:outline-none'
                      }
                    >
                      Se Connecter
                      <ArrowRightIcon
                        className='ml-3 -mr-1 h-5 w-5'
                        aria-hidden='true'
                      />
                    </CustomLink>
                  )}
                </div>
              </div>
            </section>
          </div>
        </main>
      )}
    </div>
  );
};

export default Cart;
