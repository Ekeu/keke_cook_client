import { ChevronDownIcon, ChevronUpIcon, XIcon } from '@heroicons/react/solid';

export const ArrowRenderer = ({ expanded }) => (
  <>
    {expanded ? (
      <ChevronUpIcon
        className='h-5 w-5 text-blue-gray-400'
        aria-hidden='true'
      />
    ) : (
      <ChevronDownIcon
        className='h-5 w-5 text-blue-gray-400'
        aria-hidden='true'
      />
    )}
  </>
);

export const CustomClearIcon = () => (
  <XIcon className='h-4 w-4 text-blue-gray-400' aria-hidden='true' />
);
