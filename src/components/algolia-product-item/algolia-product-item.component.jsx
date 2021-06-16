import React from 'react';

const AlgoliaProductItem = ({ hit, components }) => {
  return (
    <a href={hit.url} className='aa-ItemLink'>
      <div className='aa-ItemContent'>
        <div className='aa-ItemIcon'>
          <img
            src={hit?.images[0]?.imageURL}
            alt={hit.title}
            width='40'
            height='40'
            className='object-cover'
          />
        </div>
        <div className='aa-ItemContentBody'>
          <div className='aa-ItemContentTitle'>
            <components.Highlight hit={hit} attribute='title' />
          </div>
        </div>
      </div>
    </a>
  );
};

export default AlgoliaProductItem;
