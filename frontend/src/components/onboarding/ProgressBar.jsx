import React from 'react';

const ProgressBar = ({step}) => {
  return (
     <>
      <div className="mb-3 flex justify-between text-sm text-[#A1A1AA]">
        <span>Step {step} of 3</span>
        <span>{step * 33}%</span>
      </div>

      <div className="mb-10 h-2 rounded-full bg-[#27272A]">
        <div
          style={{ width: `${step * 33}%` }}
          className="h-full rounded-full bg-gradient-to-r from-[#7C3AED] to-[#0566D9] transition-all duration-300"
        />
      </div>
    </>
  );
}

export default ProgressBar;
