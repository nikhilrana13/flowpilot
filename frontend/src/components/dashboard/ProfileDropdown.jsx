import React from 'react';
import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import useLogout from '@/hooks/useLogout';
import { useSelector } from 'react-redux';

const ProfileDropdown = () => {
    const user = useSelector((state)=>state.Auth.user)
    const {handleLogout} = useLogout()
    return (
        <Menu as="div" className="relative z-[99999]">
            <MenuButton className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#27272A] bg-[#18181B] px-3 py-2 transition hover:border-[#7C3AED]">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#7C3AED] font-semibold text-white">
                    {user?.fullname?.charAt(0) || "U"}
                </div>

                <div className="hidden text-left lg:block">
                    <p className="text-sm font-medium text-white">
                      {user?.fullname || "User"}
                    </p>
                    <p className="hidden text-xs text-[#71717A] md:block">
                        {user?.workemail || "NA"}
                    </p>
                </div>
                <ChevronDown className="h-4 w-4 text-[#71717A]" />
            </MenuButton>

            <MenuItems
                anchor="bottom end"
                className="mt-3 w-64 fixed z-[999999] origin-top-right rounded-2xl border border-[#27272A] bg-[#18181B] p-2 shadow-2xl outline-none"
            >
                {/* Profile */}
                <MenuItem>
                    {({ focus }) => (
                        <button
                            className={`mt-2 flex w-full items-center cursor-pointer gap-3 rounded-lg px-3 py-2 text-left transition ${focus ? "bg-[#232329]" : ""
                                }`}
                        >
                            <User className="h-4 w-4 text-[#A1A1AA]" />

                            <span className="text-sm text-white">
                                My Profile
                            </span>
                        </button>
                    )}
                </MenuItem>
                {/* Settings */}

                <MenuItem>
                    {({ focus }) => (
                        <button
                            className={`flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-left transition ${focus ? "bg-[#232329]" : ""
                                }`}
                        >
                            <Settings className="h-4 w-4 text-[#A1A1AA]" />

                            <span className="text-sm text-white">
                                Settings
                            </span>
                        </button>
                    )}
                </MenuItem>
                <div className="my-2 border-t border-[#27272A]" />
                {/* Logout */}
                <MenuItem>
                    {({ focus }) => (
                        <button
                            onClick={handleLogout}
                            className={`flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-left transition ${focus ? "bg-red-500/10" : ""
                                }`}
                        >
                            <LogOut className="h-4 w-4 text-red-400" />
                            <span className="text-sm font-medium text-red-400">
                                Logout
                            </span>
                        </button>
                    )}
                </MenuItem>
            </MenuItems>
        </Menu>
    );
}

export default ProfileDropdown;
