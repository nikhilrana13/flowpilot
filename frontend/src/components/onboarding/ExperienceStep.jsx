import React from 'react';
import { Briefcase, BookOpen, Zap } from 'lucide-react';

const options = [
    { label: "Beginner", value: "beginner", icon: BookOpen },
    { label: "Intermediate", value: "intermediate", icon: Briefcase },
    { label: "Advanced", value: "advanced", icon: Zap },
];

const ExperienceStep = ({ value, onSelect }) => {
    return (
        <div className="grid gap-4 md:grid-cols-2">
            {options.map((item) => {
                const Icon = item.icon;
                return (
                    <button
                        key={item.value}
                        onClick={() => onSelect(item.value)}
                        className={`rounded-2xl cursor-pointer border p-5 text-left transition
            ${value === item.value
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

export default ExperienceStep;