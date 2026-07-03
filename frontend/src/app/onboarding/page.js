"use client"
import CategoryStep from '@/components/onboarding/CategoryStep';
import ExperienceStep from '@/components/onboarding/ExperienceStep';
import WorkSpaceStep from '@/components/onboarding/WorkSpaceStep';
import NavigationButtons from '@/components/onboarding/NavigationButtons';
import ProgressBar from '@/components/onboarding/ProgressBar';
import StepHeader from '@/components/onboarding/StepHeader';
import React, { useState } from 'react';


const page = () => {
    const [step,setStep] = useState(1)
    const [formData, setFormData] = useState({
    categoryliketoautomate: "",
    technicalexperience: "",
    sizeofworkspace: "",
  });

  const next = () => {
    if (step < 3) setStep(step + 1);
  };

  const back = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSelect = (field, value) => {
     setFormData((prev)=>({...prev,[field]:value}))
  };

  const handleSubmit = () => {
    console.log(formData);
  };

  return (
    <div className="flex min-h-screen bg-[#101322] px-6 py-10 items-center justify-center ">
      <div className="w-full max-w-3xl rounded-3xl border border-[#27272A] bg-[#18181B] p-8">
        <ProgressBar step={step} />
        <StepHeader
          title={headings[step].title}
          subtitle={headings[step].subtitle}
        />
        {step === 1 && (
          <CategoryStep
            value={formData.categoryliketoautomate}
            onSelect={(value) =>
              handleSelect("categoryliketoautomate", value)
            }
          />
        )}
        {step === 2 && (
          <ExperienceStep
            value={formData.technicalexperience}
            onSelect={(value) =>
              handleSelect("technicalexperience", value)
            }
          />
        )}
        {step === 3 && (
          <WorkSpaceStep
            value={formData.sizeofworkspace}
            onSelect={(value) =>
              handleSelect("sizeofworkspace", value)
            }
          />
        )}
        <NavigationButtons
          step={step}
          back={back}
          next={next}
          submit={handleSubmit}
          disabled={
            (step === 1 &&
              !formData.categoryliketoautomate) ||
            (step === 2 &&
              !formData.technicalexperience) ||
            (step === 3 &&
              !formData.sizeofworkspace)
          }
        />
      </div>
    </div>
  );
}

export default page;


const headings = {
  1: {
    title: "Which category would you like to automate?",
    subtitle:
      "Tell us what type of workflows you're planning to build.",
  },
  2: {
    title: "What's your technical experience?",
    subtitle:
      "We'll personalize templates and examples for you.",
  },
  3: {
    title: "How large is your workspace?",
    subtitle:
      "This helps us recommend the right collaboration features.",
  },
};
