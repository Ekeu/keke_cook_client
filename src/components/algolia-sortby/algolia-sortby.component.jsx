import React, { useState, useEffect } from 'react';
import { connectSortBy } from 'react-instantsearch-dom';

import Select from '../select/select.component';

const SortBy = ({ items, refine }) => {
  const [value, setValue] = useState(null);
  const [values, setValues] = useState([]);

  useEffect(() => {
    setValue(items[0]);
    setValues([...items]);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  return (
    <div className='mt-3 sm:mt-0 sm:ml-4 w-1/2 lg:w-1/4'>
      <Select
        options={values}
        value={value}
        onChange={(current) => {
          setValue(current);
          refine(current.value);
        }}
      />
    </div>
  );
};

const AlgoliaSortBy = connectSortBy(SortBy);

export default AlgoliaSortBy;
