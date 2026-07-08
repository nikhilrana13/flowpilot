import Link from "next/link";
import {
    Check,
    CheckCircle2,
    ChevronRight,
    Clock3,
    Copy,
    MousePointerClick,
    Webhook,
    XCircle,
} from "lucide-react";
import { toast } from "react-toastify";
import { useState } from "react";

const statusConfig = {
    completed: {
        icon: CheckCircle2,
        iconClass: "text-emerald-400",
        bgClass: "bg-emerald-500/10",
    },
    failed: {
        icon: XCircle,
        iconClass: "text-red-400",
        bgClass: "bg-red-500/10",
    },
    running: {
        icon: Clock3,
        iconClass: "text-[#7C3AED] animate-pulse",
        bgClass: "bg-[#7C3AED]/10",
    },
};

const ExecutionHistoryCard = ({ execution, href }) => {
    const config = statusConfig[execution.status] || statusConfig.running;
    const StatusIcon = config.icon;
    const [copied, setCopied] = useState(false);

    const webhookUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/webhooks/${execution.workflowId.webhookId}`;

    const handleCopyWebhook = async () => {
        try {
            await navigator.clipboard.writeText(webhookUrl);
            setCopied(true);
            toast.success("Webhook Url copied");
            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (error) {
            toast.error("Failed to copy webhook ID");
        }
    };

    return (
        <Link
            href={href}
            className="group block rounded-2xl border border-[#27272A] bg-[#18181B] p-6 transition-all duration-200 hover:border-[#7C3AED]/40 hover:bg-[#1B1B20]"
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className={`rounded-xl p-3 ${config.bgClass}`}>
                        <StatusIcon size={22} className={config.iconClass} />
                    </div>

                    <div>
                        <div className="flex items-center gap-3">
                            <h3 className="font-semibold capitalize text-white">
                                {execution.status}
                            </h3>

                            <span
                                className={`rounded-full px-2.5 py-1 text-xs font-medium ${execution.triggerType === "manual"
                                    ? "bg-blue-500/10 text-blue-400"
                                    : "bg-orange-500/10 text-orange-400"
                                    }`}
                            >
                                {execution.triggerType}
                            </span>
                        </div>

                        <div className="mt-2 flex flex-wrap items-center gap-5 text-sm text-[#A1A1AA]">
                            <span className="flex items-center gap-2">
                                {execution.triggerType === "manual" ? (
                                    <MousePointerClick size={15} />
                                ) : (
                                    <Webhook size={15} />
                                )}

                                {execution.triggerType}
                            </span>

                            <span>
                                {new Date(execution.startedAt).toLocaleString()}
                            </span>

                            <span>{execution.duration} ms</span>
                        </div>
                        {execution.triggerType === "webhook" && (
                            <div className="mt-3 flex items-center gap-3">
                                <span className="text-xs text-[#71717A]">
                                    Webhook Url
                                </span>

                                <code className="rounded bg-[#111114] px-2 py-1 text-xs text-[#E4E4E7]">
                                    {webhookUrl}
                                </code>

                                <button onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleCopyWebhook();
                                }} className="ml-4 flex cursor-pointer items-center gap-2 rounded-lg border border-[#2A2A33] px-3 py-2 text-sm text-white transition hover:border-[#7C3AED]/40 hover:bg-[#1E1E24]">
                                    {copied ? (
                                        <>
                                            <Check size={16} className="text-emerald-400" />
                                            Copied
                                        </>
                                    ) : (
                                        <>
                                            <Copy size={16} />
                                            Copy
                                        </>
                                    )}
                                </button>
                            </div>
                        )}

                        <p className="mt-3 text-xs text-[#71717A]">
                            ID : {execution._id}
                        </p>
                    </div>
                </div>

                <ChevronRight
                    size={22}
                    className="text-[#71717A] transition group-hover:translate-x-1 group-hover:text-white"
                />
            </div>
        </Link>
    );
};

export default ExecutionHistoryCard;