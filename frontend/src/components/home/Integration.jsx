import React from 'react';
import Image from "next/image";
import { Activity, CheckCircle, Code2, Terminal } from "lucide-react";

const Integration = () => {
    return (
        <section className="mx-auto max-w-7xl px-6 py-24">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
                {/* API Integration */}
                <div className="group relative overflow-hidden rounded-2xl border border-[#27272A] bg-[#18181B]/80 p-8 backdrop-blur md:col-span-7">

                    <div className="relative z-10">
                        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-[#27272A] bg-[#232329]">
                            <Code2 className="h-6 w-6 text-[#7C3AED]" />
                        </div>

                        <h3 className="mb-4 text-3xl font-bold text-white">
                            Unified API Integration
                        </h3>

                        <p className="max-w-md text-[#A1A1AA]">
                            Connect to any service in seconds. FlowPilot handles
                            authentication, retries and rate limiting automatically.
                        </p>
                    </div>

                    <div className="mt-12 translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                        <div className="rounded-t-xl border border-[#27272A] bg-[#111111] p-5 font-mono text-sm">

                            <p className="mb-3 text-[#71717A]">
                     // SDK Example
                            </p>

                            <p className="text-white">
                                <span className="text-[#7C3AED]">const</span> pilot =
                                <span className="text-[#7C3AED]"> new </span>
                                FlowPilot(
                                <span className="text-[#22C55E]">'sk_live...'</span>);
                            </p>

                            <p className="mt-2 text-white">
                                pilot.
                                <span className="text-[#3B82F6]">trigger</span>(
                                <span className="text-[#22C55E]">'user-signup'</span>,
                                {"{ id: 123 }"});
                            </p>

                        </div>
                    </div>
                </div>
                {/* Monitoring */}
                <div className="group overflow-hidden rounded-2xl border border-[#27272A] bg-gradient-to-br from-[#202024] to-[#18181B] p-8 md:col-span-5">

                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-[#27272A] bg-[#232329]">
                        <Activity className="h-6 w-6 text-[#22C55E]" />
                    </div>

                    <h3 className="mb-4 text-3xl font-bold text-white">
                        Real-time Visibility
                    </h3>

                    <p className="mb-8 text-[#A1A1AA]">
                        Inspect every execution, variable and API response as it happens.
                    </p>

                    <div className="space-y-3">

                        <div className="flex items-center justify-between rounded-lg border border-[#27272A] bg-[#111111] p-3">

                            <div className="flex items-center gap-3">

                                <span className="h-2 w-2 rounded-full bg-[#22C55E]" />

                                <span className="text-white">
                                    Execution #8821
                                </span>

                            </div>

                            <span className="font-mono text-[#71717A]">
                                42ms
                            </span>

                        </div>

                        <div className="flex items-center justify-between rounded-lg border border-[#27272A] bg-[#111111] p-3 opacity-70">

                            <div className="flex items-center gap-3">

                                <span className="h-2 w-2 rounded-full bg-[#22C55E]" />

                                <span className="text-white">
                                    Execution #8820
                                </span>

                            </div>

                            <span className="font-mono text-[#71717A]">
                                38ms
                            </span>

                        </div>

                        <div className="flex items-center justify-between rounded-lg border border-[#27272A] bg-[#111111] p-3 opacity-40">

                            <div className="flex items-center gap-3">

                                <span className="h-2 w-2 rounded-full bg-red-500" />

                                <span className="text-white">
                                    Execution #8819
                                </span>

                            </div>

                            <span className="font-mono text-[#71717A]">
                                ERR
                            </span>

                        </div>

                    </div>

                </div>
                {/* Developer First */}
                <div className="rounded-2xl border border-[#27272A] bg-[#18181B]/80 p-8 backdrop-blur md:col-span-12">
                    <div className="flex flex-col items-center gap-10 md:flex-row">
                        {/* Left Content */}
                        <div className="w-full md:w-1/2">
                            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-[#27272A] bg-[#232329]">
                                <Terminal className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="mb-4 text-3xl font-bold text-white">
                                Developer-First Ecosystem
                            </h3>
                            <p className="mb-8 leading-8 text-[#A1A1AA]">
                                Built for engineers who hate black-box tools. Version control
                                through Git, local development CLI and comprehensive
                                documentation for every edge case.
                            </p>
                            <div className="space-y-5">
                            <div className="flex items-center gap-3">
                                    <CheckCircle className="h-5 w-5 text-[#22C55E]" />
                                    <span className="text-[#E4E4E7]">
                                        Infrastructure as Code (YAML / JSON)
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckCircle className="h-5 w-5 text-[#22C55E]" />
                                    <span className="text-[#E4E4E7]">
                                        Custom Node SDK for Node.js & Python
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckCircle className="h-5 w-5 text-[#22C55E]" />
                                    <span className="text-[#E4E4E7]">
                                        Automated Workflow Testing
                                    </span>
                                </div>
                            </div>
                        </div>
                        {/* Right Preview */}
                        <div className="w-full md:w-1/2">
                            <div className="overflow-hidden rounded-xl border border-[#27272A] bg-[#111111] p-4">
                                <Image
                                    src="/code.png"
                                    alt="Developer Preview"
                                    width={900}
                                    height={600}
                                    className="h-[280px] w-full rounded-lg object-cover opacity-90"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Integration;
