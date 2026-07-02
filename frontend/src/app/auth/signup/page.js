import SignUp from "@/components/common/SignUp";
import { GitBranch } from "lucide-react";

const page = () => {
  return (
    <div className="bg-[#0F0F13] min-h-screen flex flex-col">
          <main className="flex flex-col flex-1 md:flex-row">
      {/* Left Section */}
      <section className="relative overflow-hidden px-8 py-8 flex md:w-1/2 lg:w-3/5 items-center justify-center  border-r border-[#37333E]/30 ">
        {/* Background */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "radial-gradient(#27272A 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute -right-[10%] -top-[10%] h-[500px] w-[500px] rounded-full bg-[#7C3AED]/10 blur-[120px]" />

        <div className="absolute -bottom-[10%] -left-[10%] h-[400px] w-[400px] rounded-full bg-[#0566D9]/10 blur-[100px]" />

        <div className="relative z-10 max-w-xl">
          {/* Badge */}

          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#4A4455]/50 bg-[#2C2833] px-4 py-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#7C3AED]" />

            <span className="text-sm text-[#CCC3D8]">FlowPilot Live</span>
          </div>
          {/* Heading */}
          <h1 className="text-5xl font-bold leading-tight tracking-tight text-[#E8DFEE]">
            Automate logic with
            <br />
            <span className="bg-gradient-to-r from-[#7C3AED] to-[#0566D9] bg-clip-text text-transparent">
              fluid intelligence.
            </span>
          </h1>

          {/* Description */}

          <p className="mt-6 text-[1rem] leading-8 text-[#CCC3D8]">
            "FlowPilot has completely transformed our deployment pipeline. The
            visual logic nodes make complex automation feel like second nature."
          </p>

          {/* Card */}

          <div className="mt-12 rounded-2xl border border-[#37333E] bg-[#18181B]/80 p-6 backdrop-blur-xl shadow-[0_0_25px_rgba(124,58,237,.15)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#7C3AED]">
                  <GitBranch className="h-5 w-5 text-white" />
                </div>

                <span className="font-semibold text-white">
                  Workflow Executor
                </span>
              </div>

              <span className="text-sm font-medium text-[#7C3AED]">
                Active Flow
              </span>
            </div>

            <div className="mt-6">
              <div className="h-2 overflow-hidden rounded-full bg-[#37333E]">
                <div className="h-full w-[84%] rounded-full bg-[#7C3AED]" />
              </div>

              <div className="mt-3 flex justify-between text-sm text-[#CCC3D8]">
                <span>Processing Triggers...</span>

                <span>84%</span>
              </div>
            </div>
          </div>

          {/* Users */}
          <div className="mt-10 flex items-center  gap-4 border-t border-[#37333E]/40 pt-8">
            <div className="flex -space-x-3">
              <div
                className="h-10 w-10 rounded-full border-2 border-[#0F0F13] bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCwA8ZjV8JG2IDZBjA_Fe1XdCJHdZiyrL5JUhg6wfkI3JHkIXDHODP83ji4dAWvBAbg6SI0imAc8M__pBe33EzDJStymZ3vwtNJ9VShpcKjThzRNthov0UT2CN9K2dTppJIPJdmxiYN4-bKzpa-q9qa_YmNx-yVQLKXclOgsuxF3Qkoa5VSLcJmCCDc26saHaeLGnUg5flVXkGvKhdQ642KqnAjaWqyc7mUFujEutWEiOskTgo-DvzqLobVSJY5rzHDqvQrEwOutnDA')",
                }}
              />

              <div
                className="h-10 w-10 rounded-full border-2 border-[#0F0F13] bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAX3YjS_o2Ah_pwRSlzD-8P4YoOraDFHACSw-axh9ZwzEgXjz3rJR-ESFTAl9zto1y3rk1FDwhlCyGtqtBHURMsV9IQYJAk4fe-7vrR4dWC-e5ql3HyUaZ7FW_HoQaRwiMvXCRPEbvm8VcLuBAbH40v6XeQj_ryrLpvLtyV3fPaGd7Y-Uretggoqvhn0i0CZnFAUEDxGkahjnZXLy6lf_SbTEcMsbYB5yhEaPNh25ROZSsxsf1N87C2ACzllyeLTRyh1DSpOOcDkgsu')",
                }}
              />

              <div
                className="h-10 w-10 rounded-full border-2 border-[#0F0F13] bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAO8wc3EHatYak-pJeIp_AkzbFC9k3zBB3awXRgQjLB2ue42DK2g7tCPkqEpEAbu2xGfaD7jnbzeaL_PPpDq3PT9QHRXW_Hpd6Ji9sUUoLxyriga6lX-J127UDDgML-A6NXwRAZKQOlIPaERrB6ddiUILXD9kvCzrw6QDbGTRRj0Msi9iBKDOKHPRG-UuTOleVjMq9zNssVjE5f-LkvgErSz8GK91HvsFnKj_DB6UPsDuKCk38S_O3qTl1Wwd-hsaJ6dKD8h8vVbxLU')",
                }}
              />
          
            </div>
              <p className="text-sm  text-[#CCC3D8]">
              Join <span className="font-bold text-white">10k+ developers</span>{" "}
              building the future.
            </p>
          </div>
        </div>
      </section>
     <SignUp />
    </main>
    </div>
  
  );
};

export default page;
