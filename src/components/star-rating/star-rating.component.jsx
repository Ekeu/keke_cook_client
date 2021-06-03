import React from 'react';
import StarRatings from 'react-star-ratings';

import Modal from '../modal/modal.component';
import CustomButton from '../custom-button/custom-button.component.jsx';

const StarRatingModal = ({
  openRating,
  setOpenRating,
  onSubmit,
  onCancel,
  cancelRef,
  loading,
  changeRating,
  rating,
  productId,
}) => {
  return (
    <Modal
      open={openRating}
      backgroundColor={'bg-blue-gray-500'}
      backgroundOpacity={'bg-opacity-60'}
      initialFocusRef={cancelRef}
      onClose={setOpenRating}
    >
      <div className='sm:flex sm:items-start justify-center py-6'>
        <StarRatings
          name={productId}
          numberOfStars={5}
          starSpacing='3px'
          starHoverColor='#FDA4AF'
          starEmptyColor='#E2E8F0'
          starRatedColor='#FB7185'
          rating={rating}
          changeRating={changeRating}
        />
      </div>
      <div className='mt-5 sm:mt-4 sm:flex sm:flex-row-reverse justify-center'>
        <CustomButton
          type='button'
          onClick={onSubmit}
          loading={loading}
          loaderHeight={'h-4'}
          loaderWidth={'h-4'}
          customStyles='border border-transparent text-white bg-rose-600 hover:bg-rose-700 sm:ml-3 sm:w-auto sm:text-sm'
        >
          Soumettre
        </CustomButton>
        <CustomButton
          type='button'
          onClick={onCancel}
          ref={cancelRef}
          customStyles='border border-blue-gray-400 text-blue-gray-700 bg-white hover:bg-blue-gray-50 mt-3 sm:mt-0 sm:w-auto sm:text-sm'
        >
          Annuler
        </CustomButton>
      </div>
    </Modal>
  );
};

export default StarRatingModal;
