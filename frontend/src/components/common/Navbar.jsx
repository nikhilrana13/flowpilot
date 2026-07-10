"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import { IoIosCloseCircleOutline, IoMdMenu } from 'react-icons/io';

const Navbar = () => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <header className="sticky px-6 md:px-16 lg:px-30  top-0 z-100 py-5  w-full border-b border-[#27272A] bg-[#121315]/80 backdrop-blur-md">
                <nav className="flex items-center justify-between">
                    {/* Logo & Nav Links */}
                    <div className="flex items-center gap-10">
                        <Link
                            href="/"
                            className="text-xl font-bold tracking-tight text-[#ffffff]"
                        >
                            FlowPilot
                        </Link>

                        <div className="hidden items-center gap-8 md:flex">
                             <Link
                                href="/"
                                className="text-[#A1A1AA] transition-colors hover:text-white"
                            >
                                Home
                            </Link>
                            <Link
                                href="/docs"
                                className="text-[#A1A1AA] transition-colors hover:text-white"
                            >
                                Docs
                            </Link>
                        </div>
                    </div>
                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <Link
                            href="/auth/login"
                            className="rounded-lg hidden md:flex px-4 py-2 text-[#A1A1AA] transition-colors hover:text-white active:scale-95"
                        >
                            Sign In
                        </Link>

                        <Link
                            href="/auth/signup"
                            className="rounded-lg hidden md:flex bg-linear-to-r from-[#7C3AED] to-[#0566D9] px-5 py-2 font-semibold text-white transition-all hover:opacity-90 active:scale-95"
                        >
                            Get Started
                        </Link>
                        {/* menu */}
                        <button onClick={() => setOpen(true)} className='md:hidden flex p-2 rounded-md text-[#ffffff]'>
                            <IoMdMenu size={24} />
                        </button>
                    </div>

                </nav>
            </header>
            {/* mobile menu  */}
            <div className={`lg:hidden transition-transform ease-in-out ${open ? 'translate-x-0' : '-translate-x-full'} duration-300 fixed inset-0 bg-[#121315]/80 backdrop-blur-md flex items-center justify-center flex-col gap-8 z-999`}>
                <div className="flex items-center gap-8 flex-col active:scale-95">
                    <Link
                        href="/docs"
                        className=" border-[#ffffff] font-semibold text-[#ffffff] transition"
                    >
                        Docs
                    </Link>
                    <Link
                        href="/auth/login"
                        className="rounded-lg  text-[#A1A1AA] transition-colors hover:text-white active:scale-95"
                    >
                        Sign In
                    </Link>
                    <Link
                        href="/auth/signup"
                        className="rounded-lg  text-[#A1A1AA] transition-colors hover:text-white active:scale-95 "
                    >
                        Get Started
                    </Link>
                </div>
                <button onClick={() => setOpen(false)} className='p-2 rounded-md text-[#ffffff]'>
                    <IoIosCloseCircleOutline size={24} />
                </button>
            </div>
        </>

    );
}

export default Navbar;
