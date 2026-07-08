import { useExecutionContext } from '@/context/ExecutionContext';
import React from 'react';
import { X, Loader2, CheckCircle2, XCircle, PlayCircle, Clock3 } from "lucide-react";
import OutputRenderer from './OutputRenderer';
import useLockBodyScroll from '@/hooks/useLockBodyScroll';

const ExecutionDialog = () => {
    const { executionDialogOpen, status, result, executionError, steps, resetExecution } = useExecutionContext()
    useLockBodyScroll(executionDialogOpen)

    if (!executionDialogOpen) return null;

    const onClose = () => {
        if (status === "running") return;
        resetExecution()
    }
    const completedSteps = steps.filter(s => s.status === "completed").length;
    const progress = steps.length ? (completedSteps / steps.length) * 100 : 0;

    return (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-5">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-md"
                onClick={onClose}
            />
            {/* Dialog */}
            <div className="relative w-full max-w-2xl max-h-[90vh] rounded-3xl border border-[#2A2A33] bg-[#18181B] shadow-[0_0_80px_rgba(124,58,237,.18)]">
                <div className="overflow-y-auto custom-scrollbar max-h-[90vh]">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-[#27272A] px-6 py-5">
                        <div>
                            <h2 className="text-xl font-semibold text-white">
                                Workflow Execution
                            </h2>
                            <p className="mt-1 text-sm text-[#A1A1AA]">
                                Live execution status
                            </p>
                        </div>
                        <button
                            disabled={status === "running"}
                            onClick={onClose}
                            className="rounded-xl p-2 cursor-pointer text-[#A1A1AA] transition hover:bg-[#24242A] hover:text-white"
                        >
                            <X size={20} />
                        </button>
                    </div>
                    {/* Body */}
                    <div className="space-y-6 p-6">
                        {/* Status Card */}
                        <div className="rounded-2xl border border-[#27272A] bg-[#111114] p-5">
                            <div className="flex items-center gap-4">
                                {status === "running" && (
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#7C3AED]/10">
                                        <Loader2
                                            size={28}
                                            className="animate-spin text-[#7C3AED]"
                                        />
                                    </div>
                                )}
                                {status === "completed" && (
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10">
                                        <CheckCircle2
                                            size={28}
                                            className="text-emerald-400"
                                        />
                                    </div>
                                )}
                                {status === "failed" && (
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10">
                                        <XCircle
                                            size={28}
                                            className="text-red-400"
                                        />
                                    </div>
                                )}
                                <div>
                                    <h3 className="font-semibold text-white">
                                        {status === "running" && "Executing Workflow..."}
                                        {status === "completed" &&
                                            "Execution Completed"}
                                        {status === "failed" &&
                                            "Execution Failed"}
                                    </h3>
                                    <p className="mt-1 text-sm text-[#A1A1AA]">
                                        {status === "running"
                                            ? "Please wait while your workflow executes."
                                            : status === "completed"
                                                ? "Workflow finished successfully."
                                                : "Workflow execution failed."}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Progress */}
                        <div className="rounded-2xl border border-[#27272A] bg-[#111114] p-5">
                            <div className="mb-5 flex items-center gap-2">
                                <PlayCircle
                                    size={18}
                                    className="text-[#7C3AED]"
                                />
                                <span className="font-medium text-white">
                                    Execution Progress
                                </span>
                            </div>
                            <div className="mb-5">
                                <div className="mb-2 flex items-center justify-between text-xs text-[#A1A1AA]">
                                    <span>
                                        {completedSteps} / {steps.length} Steps
                                    </span>
                                    <span>{Math.round(progress)}%</span>
                                </div>

                                <div className="h-2 overflow-hidden rounded-full bg-[#27272A]">
                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-[#7C3AED] to-[#0566D9] transition-all duration-500"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                {steps?.length === 0 ? (
                                    <div className="flex items-center justify-center rounded-xl bg-[#18181B] py-8 text-sm text-[#71717A]">
                                        Waiting for execution...
                                    </div>
                                ) : (
                                    steps?.map((step) => {
                                        const duration = step.completedAt && step.startedAt ? new Date(step.completedAt) - new Date(step.startedAt) : null;
                                        return (
                                            <div
                                                key={step.node.id}
                                                className="flex items-center justify-between rounded-xl bg-[#18181B] px-4 py-3"
                                            >
                                                <div>
                                                    <p className="font-medium text-white">
                                                        {step.node.label || step.node.type}
                                                    </p>

                                                    <p className="mt-1 text-xs capitalize text-[#A1A1AA]">
                                                        {step.node.type}
                                                    </p>

                                                    {duration !== null && (
                                                        <p className="mt-1 text-xs text-[#71717A]">
                                                            {duration} ms
                                                        </p>
                                                    )}
                                                </div>

                                                {step.status === "running" && (
                                                    <Loader2
                                                        size={18}
                                                        className="animate-spin text-[#7C3AED]"
                                                    />
                                                )}

                                                {step.status === "completed" && (
                                                    <CheckCircle2
                                                        size={18}
                                                        className="text-emerald-400"
                                                    />
                                                )}

                                                {step.status === "failed" && (
                                                    <XCircle
                                                        size={18}
                                                        className="text-red-400"
                                                    />
                                                )}

                                            </div>
                                        )
                                    })
                                )}
                            </div>
                        </div>
                        {/* Result */}
                        {result && (
                            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
                                <div className="flex items-center justify-between border-b border-emerald-500/10 px-5 py-3">
                                    <h3 className="font-medium text-emerald-400">Output</h3>

                                    <div className="flex gap-2">
                                        <button>Copy</button>
                                        <button>Download</button>
                                    </div>
                                </div>

                                <div className="max-h-80 custom-scrollbar overflow-auto p-5 text-sm text-[#E4E4E7]">
                                    <OutputRenderer data={result} />
                                </div>
                            </div>
                        )}
                        {/* Error */}
                        {executionError && (
                            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5">
                                <h3 className="font-medium text-red-400">
                                    Error
                                </h3>
                                <div className="mt-3">
                                    <OutputRenderer data={executionError} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExecutionDialog;

