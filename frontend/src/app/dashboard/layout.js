"use client";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const layout = ({ children }) => {
  const [open, setIsOpen] = useState(false);
  const pathname = usePathname();
  //auto close sidebar    
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);
  return (
    <div className="flex flex-col">
      {/* header */}
      <Header onMenuClick={() => setIsOpen(true)} />
      <div className="flex flex-col md:flex-row min-h-screen w-full">
        {/* left side */}
        <div className="hidden lg:block w-full lg:w-[20%] border-r border-[#27272A]">
          <Sidebar />
        </div>
        {open && (
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-60 bg-black/50 lg:hidden"
          />
        )}
        {/* mobile sidebar */}
        <div
          className={`fixed inset-y-0 left-0  w-70 z-70 border-r border-[#27272A] bg-[#18181B] transform transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"} lg:hidden`}
        >
          <Sidebar  />
        </div>

        {/* right side */}
        <div className="w-full custom-scrollbar lg:w-[80%] bg-[#0F0F13] h-screen   overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default layout;
