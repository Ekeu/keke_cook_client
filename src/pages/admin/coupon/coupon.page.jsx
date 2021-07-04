import React, { useState, useRef, useEffect, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { useForm } from 'react-hook-form';

import {
  getCoupons,
  deleteCoupon,
  createCoupon,
} from '../../../redux/reducers/coupon/coupon.actions';
import {
  COUPON_CREATE_RESET,
  COUPON_DELETE_RESET,
} from '../../../redux/reducers/coupon/coupon.types';

import FormInput from '../../../components/form-input/form-input.component.jsx';
import SpinSVG from '../../../components/spin-svg/spin-svg.component';
import UserNav from '../../../components/nav/user.nav.component';
import UserNavChildrenLayout from '../../../components/nav/user.nav.children.layout.component';
import Notification from '../../../components/notification/notification.component.jsx';
import CustomButton from '../../../components/custom-button/custom-button.component.jsx';
import TableData from '../../../components/table-data/table-data.component.jsx';
import Modal from '../../../components/modal/modal.component';
import DeleteAlert from '../../../components/delete-alert/delete-alert.component';

import {
  ADMIN_NAVIGATION,
  COUPON_HEADLINE,
  COUPON_DESCRIPTION,
  COUPON_DELETE_ALERT_MESSAGE,
} from '../../../constants/admin.menu.constants';

const Coupon = (props) => {
  const dispatch = useDispatch();

  const [expiryDate, setExpiryDate] = useState(null);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [couponToDelete, setCouponToDelete] = useState(null);
  const cancelButtonRef = useRef();

  const couponCreate = useSelector((state) => state.couponCreate);
  const { loading, success, error, coupon } = couponCreate;
  const couponList = useSelector((state) => state.couponList);
  const {
    loading: loadingCoupons,
    success: successCoupons,
    error: errorCoupons,
    coupons,
  } = couponList;
  const couponDelete = useSelector((state) => state.couponDelete);
  const {
    loading: loadingDeleteCoupon,
    success: successDeleteCoupon,
    error: errorDeleteCoupon,
    coupon: deletedCoupon,
  } = couponDelete;

  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    dispatch(getCoupons());
    if (success) {
      toast(
        <Notification success headline='Ajout code promo.'>
          Le code promo {coupon?.name} a été enregistré avec succès.
        </Notification>
      );
      setValue('name', '');
      setValue('discount', '');
      setExpiryDate(null);
      dispatch(getCoupons());
      dispatch({ type: COUPON_CREATE_RESET });
    }
    if (successDeleteCoupon) {
      toast(
        <Notification success headline='Suppression code promo.'>
          Le code promo {deletedCoupon?.name} a été supprimé avec succès.
        </Notification>
      );
      setOpenDeleteAlert(false);
      dispatch(getCoupons());
      dispatch({ type: COUPON_DELETE_RESET });
    }
    if (error) {
      toast(
        <Notification error headline='Erreur'>
          Une erreur s'est produite veuillez réessayer.
        </Notification>
      );
    }
    if (errorDeleteCoupon) {
      toast(
        <Notification error headline='Erreur'>
          Une erreur s'est produite veuillez réessayer.
        </Notification>
      );
      setOpenDeleteAlert(false);
    }
    if (errorCoupons) {
      toast(
        <Notification error headline='Erreur'>
          Une erreur s'est produite veuillez réessayer.
        </Notification>
      );
    }
  }, [
    dispatch,
    setValue,
    error,
    errorCoupons,
    errorDeleteCoupon,
    success,
    successDeleteCoupon,
    coupon?.name,
    deletedCoupon?.name,
  ]);

  const onSubmit = handleSubmit((data) => {
    console.log('Handle Submit ', {
      ...data,
      expiry: moment(expiryDate).format('YYYY-MM-DD'),
    });
    dispatch(
      createCoupon({ ...data, expiry: moment(expiryDate).format('YYYY-MM-DD') })
    );
  });

  const deleteCouponHandler = (coupon) => {
    setOpenDeleteAlert(true);
    setCouponToDelete(coupon);
  };

  const cancelAlertAction = () => {
    setOpenDeleteAlert(false);
    setCouponToDelete(null);
  };
  const handleDelete = () => {
    dispatch(deleteCoupon(couponToDelete._id));
  };

  const DateCustomInput = forwardRef(({ value, onClick }, ref) => (
    <FormInput
      id='expiry'
      name='expiry'
      type='text'
      label='expiry'
      labelText='Date de fin'
      formInputWrapperClass='col-span-2 sm:col-span-2'
      autoComplete='off'
      readOnly
      placeholder='JJ/MM/AAAA'
      value={value}
      onClick={onClick}
      ref={ref}
      error={errors.expiry?.message}
    />
  ));

  return (
    <>
      <UserNav navigation={ADMIN_NAVIGATION}>
        <UserNavChildrenLayout
          headline={COUPON_HEADLINE}
          description={COUPON_DESCRIPTION}
        >
          <div className='mt-3'>
            <section aria-labelledby='payment_details_heading'>
              <form onSubmit={onSubmit}>
                <div className='shadow sm:rounded-md sm:overflow-hidden'>
                  <div className='bg-white py-6 px-4 sm:p-6'>
                    <div className='mt-6 grid grid-cols-6 gap-6'>
                      <FormInput
                        id='name'
                        name='name'
                        type='text'
                        label='name'
                        labelText='Nom'
                        formInputWrapperClass='col-span-2 sm:col-span-2'
                        autoComplete='off'
                        register={register('name', {
                          required: 'Saisissez le nom de la promo',
                        })}
                        minLength={6}
                        maxLength={12}
                        placeholder='KEKE-2021'
                        inputStyles='uppercase'
                        error={errors.name?.message}
                      />
                      <FormInput
                        id='discount'
                        name='discount'
                        type='number'
                        label='discount'
                        labelText='Remise (%)'
                        formInputWrapperClass='col-span-2 sm:col-span-2'
                        autoComplete='off'
                        min={5}
                        placeholder='5'
                        register={register('discount', {
                          required: 'Saisissez la remise',
                        })}
                        error={errors.discount?.message}
                      />
                      <DatePicker
                        selected={expiryDate}
                        wrapperClassName='col-span-2 sm:col-span-2'
                        locale='fr'
                        onCalendarOpen={() =>
                          document
                            .querySelector('.react-datepicker__triangle')
                            .removeAttribute('class')
                        }
                        minDate={moment().toDate()}
                        dateFormat='dd/MM/yyyy'
                        calendarClassName={'date-container'}
                        onChange={(date) => setExpiryDate(date)}
                        customInput={<DateCustomInput />}
                      />
                    </div>
                  </div>
                  <div className='px-4 py-3 bg-blue-gray-50 flex justify-end sm:px-6'>
                    <CustomButton
                      type='submit'
                      addStyles='max-w-max'
                      loading={loading}
                    >
                      Enregistrer
                    </CustomButton>
                  </div>
                </div>
              </form>
            </section>
          </div>

          {loadingCoupons ? (
            <div className='flex justify-center px-4 pt-5 pb-4 overflow-hidden my-8 w-full sm:p-6'>
              <SpinSVG size={'h-10 w-10'} color={'text-rose-500'} />
            </div>
          ) : (
            successCoupons && (
              <TableData
                headers={['Nom', 'Remise', "Date d'Expiration", 'Statut']}
                action='Supprimer'
              >
                {coupons.map((coupon, couponIdx) => (
                  <tr
                    key={coupon._id}
                    className={
                      couponIdx % 2 === 0 ? 'bg-white' : 'bg-blue-gray-50'
                    }
                  >
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-gray-800'>
                      {coupon.name}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-blue-gray-500'>
                      {coupon.discount}
                      {'%'}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-blue-gray-500'>
                      {moment(coupon.expiry).format('L')}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <span
                        className={`px-2 inline-flex 
                        text-xs leading-5 
                        font-semibold rounded-full 
                        ${
                          moment().format('L') >
                          moment(coupon.expiry).format('L')
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {moment().format('L') >
                        moment(coupon.expiry).format('L')
                          ? 'Expiré'
                          : 'Actif'}
                      </span>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                      <span
                        className='text-rose-500 hover:text-rose-600 cursor-pointer'
                        onClick={() => deleteCouponHandler(coupon)}
                      >
                        Supprimer
                      </span>
                    </td>
                  </tr>
                ))}
              </TableData>
            )
          )}
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
          deleteAction={handleDelete}
          headline={'Suppression Code Promo'}
          loadingDelete={loadingDeleteCoupon}
        >
          {COUPON_DELETE_ALERT_MESSAGE}
        </DeleteAlert>
      </Modal>
    </>
  );
};

export default Coupon;
