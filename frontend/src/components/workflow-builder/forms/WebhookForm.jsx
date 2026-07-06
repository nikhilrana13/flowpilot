import React from 'react';

const WebhookForm = ({ node }) => {
    return (
        <div className="space-y-6 p-5">
            <div>
                <h2 className="text-lg font-semibold text-white">
                    Webhook Trigger
                </h2>

                <p className="mt-1 text-sm text-[#A1A1AA]">
                    This workflow starts when a request is sent to the generated webhook URL.
                </p>
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-white">
                    Node Name
                </label>

                <input
                    type="text"
                    value={node.data.label}
                    className="h-11 w-full rounded-xl border border-[#27272A] bg-[#111114] px-4 text-white outline-none"
                    readOnly
                />
            </div>
            <div className="rounded-xl border border-[#0566D9]/20 bg-[#0566D9]/10 p-4">
                <p className="text-sm text-[#BFDBFE]">
                    A unique webhook URL will be generated automatically after you publish this workflow.
                </p>
            </div>
        </div>
    );
}

export default WebhookForm;
