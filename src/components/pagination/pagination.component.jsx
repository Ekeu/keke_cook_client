import React from 'react';

const Pagination = ({ pages, page, setPageNumber }) => {
  return (
    pages > 1 && (
      <nav className='mx-auto border-t border-blue-gray-200 px-4 flex items-center justify-between sm:px-0 font-hind'>
        <div className='-mt-px w-0 flex-1 flex'>
          <span
            onClick={() =>
              page > 1 ? setPageNumber(page - 1) : setPageNumber(1)
            }
            className='cursor-pointer border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-blue-gray-500 hover:text-blue-gray-700 hover:border-blue-gray-300'
          >
            <svg
              className='mr-3 h-5 w-5 text-blue-gray-400'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              aria-hidden='true'
            >
              <path
                fillRule='evenodd'
                d='M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z'
                clipRule='evenodd'
              />
            </svg>
            Précédent
          </span>
        </div>
        <div className='hidden md:-mt-px md:flex'>
          {[...Array(pages).keys()].map((x) => (
            <span
              key={x + 1}
              onClick={() => setPageNumber(x + 1)}
              className={`${
                x + 1 === page
                  ? 'border-rose-500 text-rose-600'
                  : 'border-transparent text-blue-gray-500 hover:text-blue-gray-700 hover:border-blue-gray-300'
              } border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium cursor-pointer`}
            >
              {x + 1}
            </span>
          ))}
        </div>
        <div className='-mt-px w-0 flex-1 flex justify-end'>
          <span
            onClick={() =>
              page >= pages ? setPageNumber(page) : setPageNumber(page + 1)
            }
            className='cursor-pointer border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-blue-gray-500 hover:text-blue-gray-700 hover:border-blue-gray-300'
          >
            Suivant
            <svg
              className='ml-3 h-5 w-5 text-blue-gray-400'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              aria-hidden='true'
            >
              <path
                fillRule='evenodd'
                d='M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z'
                clipRule='evenodd'
              />
            </svg>
          </span>
        </div>
      </nav>
    )
  );
};

export default Pagination;
