import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-[#2D2E33] py-24">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 h-[300px] w-[800px] -translate-x-1/2 rounded-full bg-[#6366F1]/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
        {/* CTA */}
        <h2 className="mb-8 text-5xl font-bold tracking-tight text-white">
          Ready to automate your logic?
        </h2>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/auth/signup"
            className="rounded-md bg-white px-8 py-3 font-semibold text-xl text-black transition hover:opacity-90 active:scale-95"
          >
            Get Started Free
          </Link>

          <Link
            href="#"
            className="rounded-md border border-[#27272A] px-8 py-3 text-xl font-semibold text-white transition hover:bg-[#18181B] active:scale-95"
          >
            Talk to an Expert
          </Link>
        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-[#27272A] pt-8 md:flex-row">
          <div className="flex items-center gap-3">
            <span className="text-[0.9rem] font-bold text-[#ffffff]">
              FlowPilot
            </span>

            <span className="text-sm text-[#71717A]">
              © 2026 FlowPilot. All rights reserved.
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-[#A1A1AA]">
            <Link
              href="#"
              className="transition hover:text-[#7C3AED]"
            >
              Status
            </Link>

            <Link
              href="#"
              className="transition hover:text-[#7C3AED]"
            >
              Security
            </Link>

            <Link
              href="#privacy"
              className="transition hover:text-[#7C3AED]"
            >
              Privacy
            </Link>

            <Link
              href="#terms"
              className="transition hover:text-[#7C3AED]"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
