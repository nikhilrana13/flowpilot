"use client"
import Link from "next/link";
import { FolderKanban, Plus, Sparkles } from "lucide-react";
import { useState } from "react";
import CreateWorkSpaceDialog from "./CreateWorkSpaceDialog";
import useLockBodyScroll from "@/hooks/useLockBodyScroll";

const WorkspaceHeader = () => {
  const [openDialog, setOpenDialog] = useState(false)
  useLockBodyScroll(openDialog)
  return (
    <>
      <section className="relative overflow-hidden rounded-3xl border border-[#27272A] bg-[#18181B] p-6 sm:p-8">
        {/* Background Glow */}
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#7C3AED]/10 blur-3xl" />
        <div className="absolute -bottom-20 left-0 h-64 w-64 rounded-full bg-[#0566D9]/10 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          {/* Left */}
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#7C3AED]/20 bg-[#7C3AED]/10 px-4 py-2">
              <Sparkles className="h-4 w-4 text-[#7C3AED]" />

              <span className="text-sm font-medium text-[#C4B5FD]">
                Workspace Management
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className=" h-14 hidden md:flex w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#0566D9] shadow-[0_0_35px_rgba(124,58,237,.35)]">
                <FolderKanban className="h-7  w-7 text-white" />
              </div>

              <div>
                <h1 className="text-3xl font-bold text-white sm:text-4xl">
                  All Workspaces
                </h1>

                <p className="mt-2 max-w-xl text-[#A1A1AA]">
                  Manage all your automation workspaces from one place.
                  Organize projects, collaborate with your team and
                  build scalable workflows.
                </p>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <button
              onClick={()=>setOpenDialog(true)}
              className="group inline-flex cursor-pointer items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#7C3AED] to-[#0566D9] px-6 py-4 font-semibold text-white shadow-[0_0_40px_rgba(124,58,237,.25)] transition-all duration-300 hover:scale-[1.02]"
            >
              <Plus className="h-5 w-5 transition group-hover:rotate-90" />

              <span>Create Workspace</span>
            </button>
          </div>
        </div>
      </section>
      {/* open create dialog */}
      {openDialog && (
        <CreateWorkSpaceDialog onClose={()=>setOpenDialog(false)} />
      )}

    </>

  );
};

export default WorkspaceHeader;