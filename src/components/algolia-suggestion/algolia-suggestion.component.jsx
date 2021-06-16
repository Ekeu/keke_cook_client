import React from 'react';

const AlgoliaSuggestion = ({ hit, components, attribute }) => {
  return (
    <div className='aa-QuerySuggestion'>
      <components.ReverseHighlight hit={hit} attribute={attribute} />
    </div>
  );
};

export default AlgoliaSuggestion;
