import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { LocationMarkerIcon } from '@heroicons/react/solid';
import axios from 'axios';

import {
  addAddress,
  updateAddress,
} from '../../redux/reducers/user/user.actions';

import FormInput from '../form-input/form-input.component.jsx';
import CustomButton from '../custom-button/custom-button.component.jsx';
import Notification from '../notification/notification.component.jsx';

const AddAddressForm = ({ loading, addressToUpdate }) => {
  const dispatch = useDispatch();

  const [loadingActionButton, setLoadingActionButton] = useState(false);
  const googleMapsRef = useRef(null);
  const updateUserAddress = useSelector((state) => state.updateUserAddress);
  const { loading: loadingUpdateUserAddress } = updateUserAddress;
  const userDetailAddress = useSelector((state) => state.userDetailAddress);
  const {
    address: {
      first_name,
      last_name,
      street_address,
      street_address_cp,
      city,
      zip,
    },
    error,
  } = userDetailAddress;

  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    if (addressToUpdate) {
      dispatch(updateAddress(addressToUpdate, data));
    } else {
      dispatch(addAddress(data));
    }
  });

  const loadMapObject = (lat, long) => {
    return new window.google.maps.Map(googleMapsRef.current, {
      zoom: 15,
      center: new window.google.maps.LatLng(lat, long),
      mapTypeId: window.google.maps.MapTypeId.ROADMAP,
    });
  };

  const showUserLocationOnTheMap = useCallback((lat, long) => {
    const map = loadMapObject(lat, long);

    new window.google.maps.Marker({
      position: new window.google.maps.LatLng(lat, long),
      map,
    });
  }, []);

  useEffect(() => {
    const loadGooglaMapsPlacesObject = () => {
      const autocomplete = new window.google.maps.places.Autocomplete(
        document.getElementById('street_address'),
        {
          bounds: new window.google.maps.LatLngBounds(
            new window.google.maps.LatLng(48.499998, 2.499998)
          ),
        }
      );
      loadMapObject(48.499998, 2.499998);
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        setValue('city', place.address_components[2].long_name);
        setValue('zip', place.address_components[6].long_name);
        showUserLocationOnTheMap(
          place.geometry.location.lat(),
          place.geometry.location.lng()
        );
      });
    };

    if (!window.google) {
      const googleMapScript = document.createElement('script');
      googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
      googleMapScript.async = true;
      window.document.body.appendChild(googleMapScript);
      googleMapScript.addEventListener('load', loadGooglaMapsPlacesObject);
    } else {
      loadGooglaMapsPlacesObject();
    }
  }, [setValue, showUserLocationOnTheMap]);

  useEffect(() => {
    const codeAddress = () => {
      const map = loadMapObject(48.499998, 2.499998);
      const geocoder = new window.google.maps.Geocoder();

      geocoder
        .geocode({ address: street_address })
        .then(({ results }) => {
          map.setCenter(results[0].geometry.location);
          new window.google.maps.Marker({
            map: map,
            position: results[0].geometry.location,
          });
        })
        .catch((error) => {
          console.error(
            'Geocode was not successful for the following reason: ',
            error
          );
        });
    };

    if (addressToUpdate && window.google) {
      codeAddress();
      setValue('first_name', first_name);
      setValue('last_name', last_name);
      setValue('street_address', street_address);
      setValue('street_address_cp', street_address_cp);
      setValue('city', city);
      setValue('zip', zip);
    }
    if (error) {
      toast(
        <Notification error headline='Erreur de chargement'>
          Une erreur s'est produite veuillez réessayer.
        </Notification>
      );
    }
  }, [
    addressToUpdate,
    street_address,
    error,
    city,
    first_name,
    last_name,
    setValue,
    street_address_cp,
    zip,
  ]);

  const handleLocateMe = (e) => {
    e.preventDefault();
    setLoadingActionButton(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          getUserAddress(position.coords.latitude, position.coords.longitude);
          showUserLocationOnTheMap(
            position.coords.latitude,
            position.coords.longitude
          );
        },
        (error) => {
          setLoadingActionButton(false);
          toast(
            <Notification error headline={'Erreur'}>
              {error.message}
            </Notification>
          );
        }
      );
    } else {
      setLoadingActionButton(false);
      toast(
        <Notification error headline={'Erreur'}>
          La version de votre navigateur ne nous permet pas de vous localiser.
          Veuillez saisir votre adresse manuellement.
        </Notification>
      );
    }
  };

  const getUserAddress = async (lat, long) => {
    try {
      const googleMapsResponse = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
      );
      if (googleMapsResponse.data.error_message) {
        toast(
          <Notification error headline={'Erreur'}>
            {googleMapsResponse.data.error_message}
          </Notification>
        );
      } else {
        setValue(
          'street_address',
          googleMapsResponse.data.results[0].formatted_address
        );
        setValue(
          'city',
          googleMapsResponse.data.results[0].address_components[2].long_name
        );
        setValue(
          'zip',
          googleMapsResponse.data.results[0].address_components[6].long_name
        );
      }
      setLoadingActionButton(false);
    } catch (error) {
      setLoadingActionButton(false);
      toast(
        <Notification error headline={'Erreur'}>
          {error.message}
        </Notification>
      );
    }
  };

  return (
    <>
      <form className='space-y-8 divide-y divide-gray-200' onSubmit={onSubmit}>
        <div className='space-y-8 divide-y divide-gray-200'>
          <div className='pt-8'>
            <div>
              <h3 className='text-3xl leading-7 font-bold uppercase font-hind text-blue-gray-800'>
                Ajouter une nouvelle adresse
              </h3>
            </div>
            <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
              <FormInput
                id='first_name'
                name='first_name'
                type='text'
                label='first_name'
                labelText='Prénom'
                formInputWrapperClass='sm:col-span-3'
                autoComplete='given-name'
                register={register('first_name', {
                  required: 'Saisissez votre prénom',
                })}
                placeholder='Jean'
                error={errors.first_name?.message}
              />
              <FormInput
                id='last_name'
                name='last_name'
                type='text'
                label='last_name'
                labelText='Nom'
                formInputWrapperClass='sm:col-span-3'
                autoComplete='family-name'
                register={register('last_name', {
                  required: 'Saisissez votre nom',
                })}
                placeholder='Nom'
                error={errors.last_name?.message}
              />

              <FormInput
                id='street_address'
                name='street_address'
                type='text'
                label='street_address'
                labelText='Adresse'
                formInputWrapperClass='sm:col-span-6'
                autoComplete='street-address'
                TrailingButton={LocationMarkerIcon}
                loadingActionButton={loadingActionButton}
                actionButton={handleLocateMe}
                register={register('street_address', {
                  required: 'Veuillez saisir votre adresse de livraison.',
                })}
                placeholder="Place d'Armes"
                helpText='Nous livrons uniquement dans la région Île-de-France'
                error={errors.street_address?.message}
              />

              <FormInput
                id='street_address_cp'
                name='street_address_cp'
                type='text'
                label='street_address_cp'
                labelText='Complément Adresse'
                formInputWrapperClass='sm:col-span-6'
                autoComplete='off'
                register={register('street_address_cp')}
                placeholder='chez Marie Anne'
                error={errors.street_address_cp?.message}
              />

              <FormInput
                id='zip'
                name='zip'
                type='text'
                label='zip'
                labelText='Code Postal'
                formInputWrapperClass='sm:col-span-3'
                autoComplete='postal-code'
                register={register('zip', {
                  required: 'Saisissez votre code postal',
                })}
                placeholder='78000'
                error={errors.zip?.message}
              />

              <FormInput
                id='city'
                name='city'
                type='text'
                label='city'
                labelText='Ville'
                formInputWrapperClass='sm:col-span-3'
                autoComplete='off'
                register={register('city', {
                  required: 'Saisissez votre ville',
                })}
                placeholder='Versailles'
                error={errors.city?.message}
              />
            </div>

            <div className='bg-white relative mt-8'>
              <div
                className='rounded-2xl shadow-xl h-96 w-full'
                id='map'
                ref={googleMapsRef}
              ></div>
            </div>
          </div>
        </div>
        <div className='pt-5'>
          <div className='flex justify-end'>
            <CustomButton
              type='submit'
              loading={loading || loadingUpdateUserAddress}
              customStyles='border border-transparent text-white bg-rose-500 hover:bg-rose-600 max-w-max'
            >
              Enregistrer
            </CustomButton>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddAddressForm;
