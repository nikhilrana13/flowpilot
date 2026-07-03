import React from 'react';

const StepHeader = ({title,subtitle}) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-white">
        {title}
      </h1>

      <p className="mt-2 text-[#A1A1AA]">
        {subtitle}
      </p>
    </div>
  );
}

export default StepHeader;
