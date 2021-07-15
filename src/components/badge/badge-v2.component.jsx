import React from 'react';

const BadgeV2 = ({ text, bgColor, textColor }) => {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-md text-sm font-medium ${bgColor} ${textColor}`}
    >
      {text}
    </span>
  );
};

export default BadgeV2;
