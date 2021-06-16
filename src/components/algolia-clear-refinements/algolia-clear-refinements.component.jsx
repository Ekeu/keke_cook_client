import React from 'react';
import { connectCurrentRefinements } from 'react-instantsearch-dom';
import { RefreshIcon } from '@heroicons/react/solid';

const ClearRefinements = ({ items, refine, setEnabled }) => {
  const handleClearRefinements = () => {
    const rls = document.getElementsByName('rls');
    for (let index = 0; index < rls.length; index++) {
      if (rls[index].type === 'checkbox') {
        rls[index].checked = false;
      }
    }
    setEnabled(false);
    refine(items);
  };
  return (
    <button
      type='button'
      onClick={handleClearRefinements}
      disabled={!items.length}
      className={`inline-flex items-center justify-center px-3 py-2 border ${
        !items.length ? 'border-blue-gray-200' : 'border-blue-gray-400'
      } rounded-md shadow-sm text-sm leading-4 font-medium ${
        !items.length ? 'text-blue-gray-400' : 'text-blue-gray-600'
      } bg-white hover:bg-blue-gray-50 focus:outline-none`}
    >
      <RefreshIcon className='-ml-0.5 mr-2 h-4 w-4' aria-hidden='true' />
      Réinitialiser
    </button>
  );
};

const AlgoliaClearRefinements = connectCurrentRefinements(ClearRefinements);

export default AlgoliaClearRefinements;
