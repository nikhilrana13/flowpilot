import React, { useState } from 'react';
import { ChevronDown, } from "lucide-react";
import Link from 'next/link';
import { sidebarLinks } from './SidebarLinks';
import { usePathname } from 'next/navigation';
import useLogout from '@/hooks/useLogout';
import { LuLogOut } from 'react-icons/lu';
import { AnimatePresence } from 'framer-motion';
import { motion } from "framer-motion"


const Sidebar = () => {
    const pathname = usePathname();
    const { handleLogout } = useLogout()
    const [openMenus, setOpenMenus] = useState({
        Workspaces: pathname.startsWith("/dashboard/workspaces"),
        Workflows: pathname.startsWith("/dashboard/workflows") || pathname.startsWith("/dashboard/executions"),
    });

    const toggleMenu = (label) => {
        setOpenMenus((prev) => ({
            ...prev,
            [label]: !prev[label],
        }));
    };
    return (
        <aside className="flex flex-col py-5 md:px-8 px-5 h-full shrink-0">
            <nav className="space-y-6">
                {sidebarLinks.map((item) => {
                    const Icon = item.icon;
                    const isParentActive = item.children && item.children.some((child) => pathname.startsWith(child.href));
                    if (item.href) {
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`flex items-center gap-3 rounded-xl px-4 py-3 transition
                                    ${pathname === item.href
                                        ? "bg-[#7C3AED]/15 text-[#7C3AED]"
                                        : "text-[#D4D4D8] hover:bg-[#232329]"
                                    }`}>
                                <Icon size={20} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    }
                    return (
                        <div key={item.label}>
                            <button
                                onClick={() => toggleMenu(item.label)}
                                className={`flex w-full cursor-pointer items-center justify-between rounded-xl px-4 py-3 transition
                                    ${isParentActive
                                        ? "bg-[#7C3AED]/15 text-[#7C3AED]"
                                        : "text-[#D4D4D8] hover:bg-[#232329]"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon size={20} />
                                    <span>{item.label}</span>
                                </div>
                                <ChevronDown
                                    size={18}
                                    className={`transition duration-300 ${openMenus[item.label] ? "rotate-180" : ""
                                        }`}
                                />
                            </button>
                            <AnimatePresence>
                                {openMenus[item.label] && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{
                                            layout: {
                                                duration: 0.25,
                                                ease: "easeInOut",
                                            },
                                            opacity: {
                                                duration: 0.15,
                                            },
                                        }}
                                        className="overflow-hidden"
                                    >
                                        <div className="ml-6 mt-2 space-y-2 border-l border-[#2B2B31] pl-4">
                                            {item.children.map((child) => (
                                                <Link
                                                    key={child.href}
                                                    href={child.href}
                                                    className={`flex rounded-lg px-3 py-2 text-sm transition
                                               ${pathname.startsWith(child.href)
                                                            ? "bg-[#7C3AED]/15 text-[#7C3AED]"
                                                            : "text-[#A1A1AA] hover:bg-[#232329] hover:text-white"
                                                        }`}
                                                >
                                                    {child.label}
                                                </Link>
                                            ))}
                                        </div>

                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </nav>
            <div className="mt-auto border-t-2 border-[#2B2B31]">
                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className="flex w-full cursor-pointer mt-4 rounded-md text-white items-center justify-between px-4 py-3 gap-3  transition border-[#2B2B31] hover:bg-[#7C3AED]/15 hover:text-[#7C3AED] ">
                    <span>Logout</span>
                    <LuLogOut size={18} />
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;

