import React from 'react';
import CustomButton from '../custom-button/custom-button.component.jsx';
import { connectStats } from 'react-instantsearch-dom';

const Stats = ({
  nbHits,
  processingTimeMS,
  nbSortedHits,
  areHitsSorted,
  setOpenFilters,
  inModal,
}) => {
  return inModal ? (
    <CustomButton
      type='button'
      onClick={() => setOpenFilters(false)}
      customStyles='inline-flex border border-transparent text-white bg-violet-600 hover:bg-violet-700 sm:text-sm'
      data-action='close-filtering'
    >
      Voir les {nbHits.toLocaleString()} résultats
    </CustomButton>
  ) : (
    <p className='text-md text-blue-gray-600'>
      {nbHits.toLocaleString()} resultats en{' '}
      {processingTimeMS.toLocaleString()}ms
    </p>
  );
};

const AlgoliaStats = connectStats(Stats);

export default AlgoliaStats;
