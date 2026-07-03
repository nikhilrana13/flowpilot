import React from 'react';
import { Bell, Plus, Search, Workflow, ChevronDown, } from "lucide-react";
import ProfileDropdown from './ProfileDropdown';
import { HiMenu } from 'react-icons/hi';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Header = ({onMenuClick}) => {
    const router = useRouter()
    return (
        <div className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-[#27272A] bg-[#0F0F13]/90  backdrop-blur-xl py-10 px-5 md:px-8  ">
            {/* Left */}
            <div className="flex items-center gap-8">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#0566D9]">
                        <Workflow className="h-5 w-5 text-white" />
                    </div>
                    <div className="hidden md:block">
                        <h1 className="text-lg font-bold text-white">
                            FlowPilot
                        </h1>
                        <p className="text-xs text-[#71717A]">
                            Automation Platform
                        </p>
                    </div>
                </div>
            </div>
            {/* Right */}
            <div className="flex items-center gap-4">
                <Link href="/dashboard/workflows/create" className="hidden md:flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#0566D9] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90">
                    <Plus className="h-4 w-4" />
                    New Workflow
                </Link>
                <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#27272A] bg-[#18181B] hover:border-[#7C3AED]">
                    <Bell className="h-5 w-5 text-[#A1A1AA]" />
                </button>
                {/* dropdown */}
                <ProfileDropdown />
                <button
                    onClick={onMenuClick}
                    className="flex h-10 w-10 items-center justify-center rounded-lg transition hover:bg-[#232329] lg:hidden"
                >
                    <HiMenu className="h-6 w-6 text-white" />
                </button>
            </div>
        </div>
    );
}

export default Header;
