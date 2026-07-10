"use client"
import { getGreeting } from "@/utils/Helpers";
import { ArrowRight, Sparkles, Workflow } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";

const WelcomeSection = () => {
    const user = useSelector((state)=>state.Auth.user)
    const greeting = getGreeting()


  return (
    <section className="relative overflow-hidden rounded-3xl border border-[#27272A] bg-[#18181B] p-6 sm:p-8 lg:p-10">
      {/* Background Glow */}
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#7C3AED]/15 blur-3xl" />
      <div className="absolute -bottom-24 left-0 h-64 w-64 rounded-full bg-[#0566D9]/10 blur-3xl" />
      <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}
        <div className="max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#7C3AED]/20 bg-[#7C3AED]/10 px-4 py-2">
            <Sparkles className="h-4 w-4 text-[#7C3AED]" />
            <span className="text-sm font-medium text-[#C4B5FD]">
            {greeting.text} {greeting.emoji}
            </span>
          </div>
          <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl xl:text-5xl">
            Welcome back,
            <span className="ml-2 bg-gradient-to-r from-[#7C3AED] to-[#0566D9] bg-clip-text text-transparent">
              {user?.fullname || "User"}
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-[#A1A1AA] sm:text-lg">
            Build, automate and monitor powerful workflows from one
            unified workspace. Track executions, manage integrations
            and scale your automation with confidence.
          </p>
        </div>
        {/* Right */}
        <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
          <Link href="/dashboard/workspaces"  className="group flex cursor-pointer items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#7C3AED] to-[#0566D9] px-4 md:px-8 py-4 font-semibold text-white shadow-[0_0_40px_rgba(124,58,237,.25)] transition-all duration-300 hover:scale-[1.02]">
            <Workflow className="h-5 w-5" />
            <span>Create WorkSpace</span>
            <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;