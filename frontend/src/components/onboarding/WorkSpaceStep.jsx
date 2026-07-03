import React from 'react';
import { User, Users, Building2, Building, Globe, Zap, Star } from 'lucide-react';

const WorkSpaceStep = ({ value, onSelect }) => {
    return (
        <div className="grid gap-4  md:grid-cols-2">
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

export default WorkSpaceStep;

const options = [
    {
        value: "justme",
        label: "Just Me",
        icon: User
    },
    {
        value: "2-10",
        label: "2 - 10 People",
        icon: Users
    },
    {
        value: "11-50",
        label: "11 - 50 People",
        icon: Building2
    },
    {
        value: "51-200",
        label: "51 - 200 People",
        icon: Building
    },
    {
        value: "201-500",
        label: "201 - 500 People",
        icon: Globe
    },
    {
        value: "501-2000",
        label: "501 - 2000 People",
        icon: Zap
    },
    {
        value: "1000+",
        label: "1000+ People",
        icon: Star
    }
];
