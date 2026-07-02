import React from 'react';
import { Play, Webhook, Code2 } from "lucide-react";
import Link from 'next/link';


const HeroSection = () => {
    return (
        <section className="relative flex min-h-screen py-16 flex-col items-center justify-center overflow-hidden px-6">
            {/* Background */}
            <div
                className="absolute inset-0 opacity-30"
                style={{
                    backgroundImage: "radial-gradient(#27272A 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                }}
            />
            {/* Hero */}
            <div className="relative z-10 mx-auto  max-w-4xl space-y-8 text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#7C3AED]/30 bg-[#7C3AED]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#7C3AED]">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-[#7C3AED]" />
                    Now in Private Beta
                </div>
                <h1 className="text-5xl sm:text-6xl font-bold leading-tight tracking-tight text-[#ffffff]">
                    Orchestrate Complex Logic
                    <br />
                    <span className="bg-linear-to-r from-[#6366F1] via-[#ffffff] to-[#6366F1] bg-clip-text text-transparent">
                        Without the Overhead
                    </span>
                </h1>
                <p className="mx-auto max-w-2xl text-sm sm:text-lg leading-8 text-[#475162]">
                    FlowPilot is the developer-first engine for building, scaling and
                    monitoring logic-intensive workflows. Deploy in minutes and scale to
                    millions of executions.
                </p>
                <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
                    <Link href="/auth/login" className="rounded-xl bg-white px-8 py-4 font-semibold text-black transition hover:bg-gray-200">
                        Start Building Free
                    </Link>
                    <button className="flex items-center justify-center gap-2 rounded-xl border border-[#27272A] bg-[#18181B]/70 px-8 py-4 text-white transition hover:bg-[#232329]">
                        <Play className="h-5 w-5" />
                        Watch Demo
                    </button>
                </div>
            </div>
            {/* Workflow Preview */}
            <div className="group relative mt-20 w-full max-w-6xl">
                <div className="absolute -inset-1 rounded-2xl bg-linear-to-r from-[#7C3AED]/20 to-[#0566D9]/20 blur-xl" />
                <div className="relative overflow-hidden rounded-2xl border border-[#27272A] bg-[#18181B]/80 backdrop-blur-xl">
                    {/* Top Bar */}
                    <div className="flex items-center justify-between border-b border-[#27272A] bg-[#18181B]/80 px-4 py-3">
                        <div className="flex gap-2">
                            <div className="h-3 w-3 rounded-full bg-red-500/40" />
                            <div className="h-3 w-3 rounded-full bg-yellow-500/40" />
                            <div className="h-3 w-3 rounded-full bg-green-500/40" />
                        </div>
                        <span className="text-xs hidden md:flex uppercase tracking-[0.3em] text-[#71717A]">
                            workflow_builder_v2.exec
                        </span>
                        <div className="w-10" />
                    </div>
                    {/* Canvas */}
                    <div
                        className="relative flex h-[500px] items-center justify-center"
                        style={{
                            backgroundImage:
                                "radial-gradient(#27272A 1px, transparent 1px)",
                            backgroundSize: "24px 24px",
                        }}
                    >

                        {/* Trigger Node */}
                        <div className="absolute left-[12%] top-[22%] w-52 rounded-xl border border-[#7C3AED]/40 bg-[#18181B]/90 p-4 backdrop-blur animate-[float_4s_ease-in-out_infinite]">
                            <div className="mb-3 flex items-center  gap-2">
                                <Webhook className="h-5 w-5 text-[#7C3AED]" />
                                <span className="font-semibold text-white">
                                    HTTP Trigger
                                </span>
                            </div>
                            <div className="h-2 overflow-hidden rounded-full bg-[#27272A]">
                                <div className="h-full w-full bg-[#7C3AED]" />
                            </div>
                            <p className="mt-2 font-mono text-xs text-[#A1A1AA]">
                                POST /v1/ingest
                            </p>
                        </div>
                        {/* Connection */}
                        <svg className="pointer-events-none absolute inset-0 h-full w-full"  preserveAspectRatio="none" viewBox="0 0 1000 600">
                            <defs>
                                <linearGradient id="line" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#7C3AED" />
                                    <stop offset="100%" stopColor="#0566D9" />
                                </linearGradient>
                            </defs>

                            {/* Glow */}
                            <path
                               viewBox="0 0 1000 600"
                                d="M150 150 C350 150 450 300 650 300"
                                stroke="#7C3AED"
                                strokeWidth="8"
                                opacity="0.15"
                                fill="none"
                            />

                            {/* Animated line */}
                            <path
                                d="M310 160 C420 160 420 250 520 250"
                                stroke="url(#line)"
                                strokeWidth="2.5"
                                fill="none"
                                strokeDasharray="10 10"
                                className="animate-flow"
                            />

                            {/* Moving Dot */}
                            <circle r="4" fill="#7C3AED">
                                <animateMotion
                                    dur="2.5s"
                                    repeatCount="indefinite"
                                    path="M310 160 C420 160 420 250 520 250"
                                />
                            </circle>
                        </svg>
                        {/* Transform Node */}
                        <div className="absolute animate-[float_4s_ease-in-out_infinite_1.5s] left-[62%] top-[55%] w-52 md:w-64 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-[#0566D9]/30 bg-[#18181B]/90 p-4 backdrop-blur">
                            <div className="mb-3 flex items-center gap-2">
                                <Code2 className="h-5 w-5 text-[#0566D9]" />
                                <span className="font-semibold text-white">
                                    Data Transform
                                </span>
                            </div>
                            <div className="rounded-lg border border-[#27272A] bg-[#111111] p-3 font-mono text-xs text-[#D4D4D4] flex ">
                                <span className="text-[#7C3AED] mr-2">return</span> payload.map(x =&gt;
                                x * 2);
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;
