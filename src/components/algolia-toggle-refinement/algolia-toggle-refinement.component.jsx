import React from 'react';
import { connectToggleRefinement } from 'react-instantsearch-dom';
import { Switch } from '@headlessui/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const ToggleRefinement = ({ currentRefinement, label, enabled, setEnabled, refine }) => {

  const onToggleChange = () => {
    setEnabled(!enabled);
    refine(!currentRefinement);
  };
  return (
    <Switch.Group as='div' className='flex items-center'>
      <Switch
        checked={enabled}
        onChange={onToggleChange}
        className={classNames(
          enabled ? 'bg-violet-600' : 'bg-blue-gray-200',
          'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none'
        )}
      >
        <span className='sr-only'>Livraison Gratuite</span>
        <span
          aria-hidden='true'
          className={classNames(
            enabled ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
          )}
        />
      </Switch>
      <Switch.Label as='span' className='ml-3'>
        <span className='text-sm font-medium text-blue-gray-800'>{label}</span>
      </Switch.Label>
    </Switch.Group>
  );
};

const AlgoliaToggleRefinement = connectToggleRefinement(ToggleRefinement);

export default AlgoliaToggleRefinement;
