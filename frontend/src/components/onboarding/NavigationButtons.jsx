import React from 'react';

const NavigationButtons = ({back,next,disabled,submit,step,loading}) => {
  return (
    <div className="mt-10 flex justify-between">

      <button
        onClick={back}
        disabled={step === 1}
        className="rounded-xl cursor-pointer border border-[#27272A] px-6 py-3 text-white disabled:opacity-40"
      >
        Back
      </button>

      {step < 3 ? (
        <button
          disabled={disabled}
          onClick={next}
          className="rounded-xl cursor-pointer bg-[#7C3AED] px-6 py-3 text-white disabled:opacity-40"
        >
          Continue
        </button>
      ) : (
        <button
          disabled={disabled || loading}
          onClick={submit}
          className="rounded-xl cursor-pointer bg-[#7C3AED] px-6 py-3 text-white disabled:opacity-40"
        >
          {loading ? "Please wait..." : "  Finish Setup"}  
        </button>
      )}
    </div>
  );
}

export default NavigationButtons;
