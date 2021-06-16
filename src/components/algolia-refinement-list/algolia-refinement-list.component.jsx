import React from 'react';
import { connectRefinementList } from 'react-instantsearch-dom';

const RefinementList = ({ items, refine }) => {
  return (
    <div className='mt-2'>
      <div className='max-w-lg space-y-2'>
        {items.map((item) => (
          <div className='relative flex items-start' key={item.label}>
            <div className='flex items-center h-5'>
              <input
                id={item.label}
                name='rls'
                type='checkbox'
                onClick={() => {
                  refine(item.value);
                }}
                className='focus:ring-violet-500 h-4 w-4 text-violet-600 border-blue-gray-300 rounded cursor-pointer ais-refinements'
              />
            </div>
            <div className='ml-3 text-sm flex'>
              <label htmlFor='comments' className='font-medium text-gray-700'>
                {item.label}
              </label>
              <span className='ml-3 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium font-hind bg-violet-200 text-violet-600'>
                {item.count}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AlgoliaRefinementList = connectRefinementList(RefinementList);

export default AlgoliaRefinementList;
