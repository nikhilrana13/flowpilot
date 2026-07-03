import React from 'react';
import {Briefcase,Megaphone,Headphones,Users,Landmark,Boxes,} from "lucide-react";


const CategoryStep = ({value,onSelect}) => {
  return (
     <div className="grid gap-4 md:grid-cols-2">
      {options.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.value}
            onClick={() => onSelect(item.value)}
            className={`rounded-2xl cursor-pointer border p-5 text-left transition
            ${
              value === item.value
                ? "border-[#7C3AED] bg-[#7C3AED]/10"
                : "border-[#27272A] hover:border-[#7C3AED]"
            }`}
          >
            <Icon className="mb-4 h-7 w-7 text-[#7C3AED]" />

            <h3 className="font-semibold text-white">
              {item.label}
            </h3>
          </button>
        );
      })}
    </div>
  );
}

export default CategoryStep;

const options = [
  {
    label: "Sales",
    value: "sales",
    icon: Briefcase,
  },
  {
    label: "Marketing",
    value: "marketing",
    icon: Megaphone,
  },
  {
    label: "Customer Support",
    value: "customersupport",
    icon: Headphones,
  },
  {
    label: "HR & People",
    value: "hrpeople",
    icon: Users,
  },
  {
    label: "Finance",
    value: "finance",
    icon: Landmark,
  },
  {
    label: "Other",
    value: "other",
    icon: Boxes,
  },
];
